import { notFound } from "next/navigation";
import prisma from "@/prisma/client";
import ProductForm from "../../ProductForm";

interface UpdateProductProps {
  params: { title: string };
}

const UpdateProduct = async ({ params }: UpdateProductProps) => {
  const url = params.title.replace("%20", " ");
  const Products = await prisma.product.findFirstOrThrow({
    where: { title: String(url) },
  });

  if (!Products) {
    notFound();
  }

  return <ProductForm product={Products} />;
};

export default UpdateProduct;
