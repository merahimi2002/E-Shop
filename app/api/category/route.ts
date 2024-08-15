import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/prisma/client";

const createCategorySchema = z.object({
  title: z.string().min(1).max(50),
  imageUrl: z.string().min(1).max(255),
});

export async function POST(request: NextResponse) {
  const body = await request.json();
  const validation = createCategorySchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const newCategory = await prisma.category.create({
    data: {
      title: body.title,
      imageUrl: body.imageUrl,
    },
  });

  return NextResponse.json(newCategory, { status: 201 });
}
