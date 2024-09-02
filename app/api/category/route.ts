import { NextResponse } from "next/server";
import { CategorySchema } from "../validation/validationSchema";
import prisma from "@/prisma/client";

export async function POST(request: NextResponse) {
  const body = await request.json();
  const validation = CategorySchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  // Check for duplicate category Title
  const ValidationCategoryTitle = await prisma.category.findUnique({
    where: { title: body.title },
  });

  if (ValidationCategoryTitle) {
    return NextResponse.json(
      { message: "Title must be unique" },
      { status: 400 }
    );
  }

  // Check for duplicate category Slug
  const ValidationCategorySlug = await prisma.category.findUnique({
    where: { slug: body.slug },
  });

  if (ValidationCategorySlug) {
    return NextResponse.json(
      { message: "Title must be unique." },
      { status: 400 }
    );
  }

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
