import { NextResponse } from "next/server";
import { createProductSchema } from "../validation/validationSchema";
import prisma from "@/prisma/client";

export async function POST(request: NextResponse) {
  const body = await request.json();
  const validation = createProductSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const newProduct = await prisma.product.create({
    data: {
      title: body.title,
      description: body.description,
      imageUrl: body.imageUrl,
      price: body.price,
      categoryId: body.categoryId,
    },
  });

  return NextResponse.json(newProduct, { status: 201 });
}
