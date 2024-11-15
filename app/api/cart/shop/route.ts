import { NextResponse } from "next/server";
import { ShopCartSchema } from "../../validation/validationSchema";
import prisma from "@/prisma/client";

export async function POST(request: NextResponse) {
  const body = await request.json();
  const validation = ShopCartSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  // check if product exist
  const ValidationProductId = await prisma.product.findUnique({
    where: { id: body.productId },
  });
  if (!ValidationProductId) {
    return NextResponse.json(
      { message: "Product is not exist" },
      { status: 400 }
    );
  }

  // check if user exist
  const ValidationUserEmail = await prisma.user.findUnique({
    where: { email: body.userEmail },
  });
  if (!ValidationUserEmail) {
    return NextResponse.json({ message: "User is not exist" }, { status: 400 });
  }
  const UserId = ValidationUserEmail.id;

  const newShopCart = await prisma.shopCart.create({
    data: {
      quantity: body.quantity,
      productId: body.productId,
      userId: UserId,
    },
  });

  return NextResponse.json(newShopCart, { status: 201 });
}
