import prisma from "@/prisma/client";
import { NextResponse } from "next/server";
import { createCategorySchema } from "../validation/validationSchema";

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
