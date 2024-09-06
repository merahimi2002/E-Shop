import { notFound } from "next/navigation";
import prisma from "@/prisma/client";
import ProductCard from "@/app/product/_components/ProductCard";

interface Props {
  params: { Category: string };
}

const CategoryFilterPage = async ({ params }: Props) => {
  const Category = await prisma.category.findUnique({
    where: { slug: String(params.Category) },
  });

  if (!Category) {
    notFound();
  }

  const Products = await prisma.product.findMany({
    where: { categoryId: Category.id },
  });

  return (
    <section>
      <div className="container">
        <div className="grid grid-cols-1 gap-4">
          <h2 className="Titr">{Category.title}</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Products.map((product) => (
            <ProductCard
              id={product.id}
              title={product.title}
              slug={product.slug}
              description={product.description}
              imageUrl={product.imageUrl}
              price={product.price}
              categorySlug={Category.slug}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryFilterPage;
