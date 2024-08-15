import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/prisma/client";

const createProductSchema = z.object({
  title: z.string().min(1).max(50),
  description: z.string().min(1),
  imageUrl: z.string().min(1).max(255),
  price: z.number().multipleOf(0.01),
});

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
    },
  });

  return NextResponse.json(newProduct, { status: 201 });
}
