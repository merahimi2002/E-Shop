import { notFound } from "next/navigation";
import prisma from "@/prisma/client";
import CategoryIdToName from "@/app/components/Product/CategoryIdToName";
import FormatCurrency from "@/app/components/Product/FormatCurrency";
import ReactMarkdown from "react-markdown";


interface Props {
  params: { ProductDetails: string };
}

const ProductDetailsPage = async ({ params }: Props) => {
  const Products = await prisma.product.findUnique({
    where: { slug: String(params.ProductDetails) },
  });

  if (!Products) {
    notFound();
  }

  return (
    <section>
      <div className="container">
        <div className="grid grid-cols-2 gap-6">
          <div className="col-span-2 lg:col-span-1">
            <img
              src={Products.imageUrl}
              alt={Products.title}
              className="w-full object-contain rounded-xl"
            />
          </div>
          <div className="col-span-2 md:col-span-1">
            <h1 className="Titr">{Products.title}</h1>
            <div className="text-accent">
              <CategoryIdToName Id={Products.categoryId} />
            </div>
            <p className="text-secondary text-right text-lg font-medium">
              {FormatCurrency(Products.price).toString()}
            </p>
            <div className="prose prose-neutral">
              <ReactMarkdown>{Products.description}</ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailsPage;
