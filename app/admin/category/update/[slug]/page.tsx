import { notFound } from "next/navigation";
import prisma from "@/prisma/client";
import CategoryForm from "../../_components/CategoryForm";

interface UpdateCategoryProps {
  params: { slug: string };
}

const UpdateCategory = async ({ params }: UpdateCategoryProps) => {
  const Category = await prisma.category.findUnique({
    where: { slug: String(params.slug) },
  });

  if (!Category) {
    notFound();
  }

  return <CategoryForm category={Category} />;
};

export default UpdateCategory;
