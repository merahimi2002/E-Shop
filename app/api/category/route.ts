import { NextResponse } from "next/server";
import { createCategorySchema } from "../validation/validationSchema";
import prisma from "@/prisma/client";

export async function POST(request: NextResponse) {
  const body = await request.json();
  const validation = createCategorySchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const newCategory = await prisma.category.create({
    data: {
      title: body.title,
      slug: body.slug,
      imageUrl: body.imageUrl,
    },
  });

  return NextResponse.json(newCategory, { status: 201 });
}

export async function GET() {
  try {
    const categories = await prisma.category.findMany();
    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}
