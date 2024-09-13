import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

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
