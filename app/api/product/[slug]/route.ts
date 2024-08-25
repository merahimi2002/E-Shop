import { NextRequest, NextResponse } from "next/server";
import { ProductSchema } from "../../validation/validationSchema";
import prisma from "@/prisma/client";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const body = await request.json();
  const validation = ProductSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const product = await prisma.product.findMany({
    where: { slug: params.slug },
  });

  if (!product)
    return NextResponse.json({ error: "Invalid Product" }, { status: 404 });

  const updatedProduct = await prisma.product.update({
    where: { title: params.slug },
    data: {
      title: body.title,
      description: body.description,
      imageUrl: body.imageUrl,
      price: body.price,
      categoryId: body.categoryId,
    },
  });

  return NextResponse.json(updatedProduct);
}
