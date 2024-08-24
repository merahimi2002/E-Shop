import prisma from "@/prisma/client";
import ProductCard from "./_components/ProductCard";

const ProductPage = async () => {
  const Products = await prisma.product.findMany();
  return (
    <section>
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
          {Products.map((product) => (
            <ProductCard
              id={product.id}
              title={product.title}
              description={product.description}
              imageUrl={product.imageUrl}
              price={product.price}
              categoryId={product.categoryId}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductPage;
