import { NextRequest, NextResponse } from "next/server";
import { LoveCart } from "../../validation/validationSchema";
import prisma from "@/prisma/client";

export async function POST(request: NextResponse) {
  const body = await request.json();
  const validation = LoveCart.safeParse(body);
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

  const newLoveCart = await prisma.loveCart.create({
    data: {
      quantity: true,
      productId: body.productId,
      userId: UserId,
    },
  });

  return NextResponse.json(newLoveCart, { status: 201 });
}

export async function DELETE(request: NextRequest) {
  const body = await request.json();
  const validation = LoveCart.safeParse(body);
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

  // user
  const WrongLoveCart = await prisma.loveCart.findMany({
    where: { userId: UserId },
  });

  // product
  const RightLoveCart = WrongLoveCart.find(
    (item) => item.productId === body.productId
  );

  if (RightLoveCart) {
    await prisma.loveCart.delete({
      where: { id: RightLoveCart.id },
    });
  } else {
    return NextResponse.json(
      { message: "Love Cart is not exist" },
      { status: 400 }
    );
  }

  return NextResponse.json({});
}
