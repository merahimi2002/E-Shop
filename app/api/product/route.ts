import { NextResponse } from "next/server";
import { ProductSchema } from "../validation/validationSchema";
import prisma from "@/prisma/client";

export async function POST(request: NextResponse) {
  const body = await request.json();
  const validation = ProductSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  // Check for duplicate Product Title
  const ValidationProductTitle = await prisma.product.findUnique({
    where: { title: body.title },
  });

  if (ValidationProductTitle) {
    return NextResponse.json(
      { message: "Title must be unique" },
      { status: 400 }
    );
  }

  // Check for duplicate Product Slug
  const Slug = body.title.toLowerCase().replace(/\s+/g, "-");
  const ValidationProductSlug = await prisma.product.findUnique({
    where: { slug: Slug },
  });

  if (ValidationProductSlug ) {
    return NextResponse.json(
      { message: "Title must be unique." },
      { status: 400 }
    );
  }

  const newProduct = await prisma.product.create({
    data: {
      title: body.title,
      slug:Slug,
      description: body.description,
      imageUrl: body.imageUrl,
      price: body.price,
      categoryId: body.categoryId,
    },
  });

  return NextResponse.json(newProduct, { status: 201 });
}
