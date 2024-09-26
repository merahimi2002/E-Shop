import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { email: string } }
) {
  const body = await request.json();
  const User = await prisma.user.findUnique({
    where: { email: params.email },
  });

  if (!User)
    return NextResponse.json({ error: "Invalid User" }, { status: 404 });

  const updatedUser = await prisma.user.update({
    where: { email: params.email },
    data: {
      role: body.role,
    },
  });

  return NextResponse.json(updatedUser);
}
