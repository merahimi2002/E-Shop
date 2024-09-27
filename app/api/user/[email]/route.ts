import { NextRequest, NextResponse } from "next/server";
import { UpdateUserSchema } from "../../validation/validationSchema";
import prisma from "@/prisma/client";
import bcrypt from "bcrypt";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { email: string } }
) {
  const body = await request.json();
  const validation = UpdateUserSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const User = await prisma.user.findUnique({
    where: { email: params.email },
  });

  if (!User)
    return NextResponse.json({ error: "Invalid User" }, { status: 404 });

  // Check for duplicate User
  const ValidationUserEmail = await prisma.user.findUnique({
    where: { email: body.email },
  });

  if (ValidationUserEmail && ValidationUserEmail?.email !== User.email) {
    return NextResponse.json({ message: "Access Denied" }, { status: 400 });
  }

  // Check Password
  const passwordsMatch = await bcrypt.compare(
    body.Password,
    User.hashedPassword
  );

  if (!passwordsMatch)
    return NextResponse.json(
      { message: "Password doesnt match" },
      { status: 400 }
    );

  const updatedUser = await prisma.user.update({
    where: { email: params.email },
    data: {
      firstName: body.firstName,
      lastName: body.lastName,
      address: body.address,
      phone: body.phone,
      image: body.image,
    },
  });

  return NextResponse.json(updatedUser);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { email: string } }
) {
  const user = await prisma.user.findUnique({
    where: { email: params.email },
  });

  if (!user)
    return NextResponse.json({ error: "Invalid User" }, { status: 404 });

  await prisma.user.delete({
    where: { email: params.email },
  });

  return NextResponse.json({});
}
