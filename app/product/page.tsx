"use client";

import { TextSummarizer } from "../components/TextSummarizer";
import { FormatCurrency } from "../components/FormatCurrency";
import prisma from "@/prisma/client";

export const CategoryName = async (Id: number | null) => {
  if (Id == null) {
    return null;
  }
  const Categories = await prisma.category.findUnique({
    where: {
      id: Id,
    },
  });

  return <p className="text-accent">{Categories?.title}</p>;
};

const ProductPage = async () => {
  const Products = await prisma.product.findMany();
  return (
    <section>
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
          {Products.map((product) => (
            <div
              className="card border-2 border-primary overflow-hidden bg-primary bg-opacity-30"
              key={product.id}
            >
              <img
                className="w-full h-1/2 object-contain"
                src={product.imageUrl}
                alt={product.title}
              />
              <div className="card-body">
                <h2 className="card-title text-xl text-primary font-semibold pb-4">
                  {TextSummarizer(product.title, 40)}
                </h2>
                <span className="text-secondary text-right text-lg font-medium">
                  {FormatCurrency(product.price).toString()}
                </span>
                {CategoryName(product.categoryId)}
                <p className="text-white">
                  {TextSummarizer(product.description, 100)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductPage;
