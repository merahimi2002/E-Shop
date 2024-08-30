import { notFound } from "next/navigation";
import prisma from "@/prisma/client";
import ProductForm from "../../_components/ProductForm";

interface UpdateProductProps {
  params: { slug: string };
}

const UpdateProduct = async ({ params }: UpdateProductProps) => {
  const Products = await prisma.product.findUnique({
    where: { slug: String(params.slug) },
  });

  if (!Products) {
    notFound();
  }

  return <ProductForm product={Products} />;
};

export default UpdateProduct;
