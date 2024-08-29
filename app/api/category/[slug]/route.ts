import { NextRequest, NextResponse } from "next/server";
import { CategorySchema } from "../../validation/validationSchema";
import prisma from "@/prisma/client";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const body = await request.json();
  const validation = CategorySchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const Category = await prisma.category.findMany({
    where: { slug: params.slug },
  });

  if (!Category)
    return NextResponse.json({ error: "Invalid Category" }, { status: 404 });

  const updatedCategory = await prisma.category.update({
    where: { slug: params.slug },
    data: {
      title: body.title,
      slug: body.slug,
      imageUrl: body.imageUrl,
    },
  });

  return NextResponse.json(updatedCategory);
}
