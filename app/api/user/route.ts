import { NextResponse } from "next/server";
import { UserSchema } from "../validation/validationSchema";
import prisma from "@/prisma/client";
import bcrypt from "bcrypt";

export async function POST(request: NextResponse) {
  const body = await request.json();
  const validation = UserSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  // Check for duplicate user
  const unValidUser = await prisma.user.findUnique({
    where: { email: body.email },
  });

  if (unValidUser) {
    return NextResponse.json({ message: "User already exists" }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(body.password, 10);

  const newUser = await prisma.user.create({
    data: {
      email: body.email,
      hashedPassword,
      firstName: body.firstName,
      lastName: body.lastName,
      address: body.address,
      phone: body.phone,
      image: body.image,
      role: body.role,
    },
  });

  return NextResponse.json({ email: body.email });
}
