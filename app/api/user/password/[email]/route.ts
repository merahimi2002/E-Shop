import { NextRequest, NextResponse } from "next/server";
import { ChangePasswordUserSchema } from "@/app/api/validation/validationSchema";
import prisma from "@/prisma/client";
import bcrypt from "bcrypt";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { email: string } }
) {
  const body = await request.json();
  const validation = ChangePasswordUserSchema.safeParse(body);
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
    body.oldPassword,
    User.hashedPassword
  );

  if (!passwordsMatch)
    return NextResponse.json(
      { message: "Password doesnt match" },
      { status: 400 }
    );
    
  // hash new Password
  const newHashedPassword = await bcrypt.hash(body.newPassword, 10);

  const updatedUser = await prisma.user.update({
    where: { email: params.email },
    data: {
      hashedPassword: newHashedPassword,
    },
  });

  return NextResponse.json(updatedUser);
}
