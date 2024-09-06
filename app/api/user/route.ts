import { NextResponse } from "next/server";
import { SignInSchema } from "../validation/validationSchema";
import prisma from "@/prisma/client";
import bcrypt from "bcrypt";

export async function POST(request: NextResponse) {
  const body = await request.json();
  const validation = SignInSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  // Check for duplicate user
  const unValidUser = await prisma.user.findUnique({
    where: { email: body.email },
  });

  if (unValidUser) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(body.password, 10);

  const newUser = await prisma.user.create({
    data: {
      email: body.email,
      hashedPassword,
    },
  });

  return NextResponse.json({ email: body.email });
}
