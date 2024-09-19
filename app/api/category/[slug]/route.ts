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

  const Category = await prisma.category.findUnique({
    where: { slug: params.slug },
  });

  if (!Category)
    return NextResponse.json({ error: "Invalid Category" }, { status: 404 });

  // Check for duplicate category Title
  const ValidationCategoryTitle = await prisma.category.findUnique({
    where: { title: body.title },
  });

  if (
    ValidationCategoryTitle &&
    ValidationCategoryTitle?.title !== Category.title
  ) {
    return NextResponse.json(
      { message: "Title must be unique" },
      { status: 400 }
    );
  }

  // Check for duplicate category Slug
  const Slug = body.title.toLowerCase().replace(/\s+/g, "-");
  const ValidationCategorySlug = await prisma.category.findUnique({
    where: { slug: Slug},
  });

  if (
    ValidationCategorySlug &&
    ValidationCategorySlug?.slug !== Category.slug
  ) {
    return NextResponse.json(
      { message: "Title must be unique." },
      { status: 400 }
    );
  }

  const updatedCategory = await prisma.category.update({
    where: { slug: params.slug },
    data: {
      title: body.title,
      slug: Slug ,
      imageUrl: body.imageUrl,
    },
  });

  return NextResponse.json(updatedCategory);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const category = await prisma.category.findUnique({
    where: { slug: params.slug },
  });

  if (!category)
    return NextResponse.json({ error: "Invalid category" }, { status: 404 });

  await prisma.category.delete({
    where: { slug: params.slug },
  });

  return NextResponse.json({});
}
