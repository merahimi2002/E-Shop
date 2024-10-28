import { NextResponse } from "next/server";
import { LoveCart } from "../../validation/validationSchema";
import prisma from "@/prisma/client";

export async function POST(request: NextResponse) {
  const body = await request.json();
  const validation = LoveCart.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  // check if product exist
  const ValidationProductId = prisma.product.findUnique({
    where: { id: body.productId },
  });
  if (!ValidationProductId) {
    return NextResponse.json(
      { message: "Product is not exist" },
      { status: 400 }
    );
  }

  // check if user exist
  const ValidationUserId = prisma.user.findUnique({
    where: { id: body.userId },
  });
  if (!ValidationUserId) {
    return NextResponse.json({ message: "User is not exist" }, { status: 400 });
  }

  const newLoveCart = await prisma.loveCart.create({
    data: {
      quantity: true,
      productId: body.productId,
      userId: body.userId,
    },
  });

  return NextResponse.json(newLoveCart, { status: 201 });
}
