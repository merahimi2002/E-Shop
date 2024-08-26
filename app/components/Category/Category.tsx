import prisma from "@/prisma/client";

const Category = async () => {
  const Categories = await prisma.category.findMany();
  return (
    <section>
      <div className="container">
        <div className="grid grid-cols-1 mb-5">
          <h2 className="Titr">Category</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Categories.map((category) => (
            <div key={category.id} className="card">
              <figure>
                <img
                  className="rounded-xl shadow-md"
                  src={category.imageUrl}
                  alt={category.title}
                />
              </figure>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Category;
