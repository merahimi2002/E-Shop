import prisma from "@/prisma/client";
import Link from "next/link";

const ProductPage = async () => {
  const Categories = await prisma.category.findMany();
  return (
    <section>
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Categories.map((category) => (
            <Link
              className="rounded-xl custom-four-color !bg-opacity-80 hover:!bg-opacity-100"
              href={`product/${category.slug}`}
            >
              <div key={category.id} className="card ">
                <figure>
                  <img
                    className="shadow-md w-full h-52 object-contain"
                    src={category.imageUrl}
                    alt={category.title}
                  />
                </figure>
                <h2 className="bg-black bg-opacity-30 p-4 text-center text-xl text-white rounded-b-xl">
                  {category.title}
                </h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductPage;
