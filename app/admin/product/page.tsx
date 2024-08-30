import CategoryIdToName from "@/app/components/CategoryIdToName";
import FormatCurrency from "@/app/components/FormatCurrency";
import TextSummarizer from "@/app/components/TextSummarizer";
import prisma from "@/prisma/client";

const AdminProduct = async () => {
  const Products = await prisma.product.findMany();
  return (
    <section>
      <div className="container">
        <div className="overflow-x-auto">
          <table className="table table-auto table-striped table-hover">
            <thead className="bg-primary">
              <tr className="text-center">
                <th className="py-6 text-xl text-secondary">Product</th>
                <th className="py-6 text-xl text-secondary">Title</th>
                <th className="py-6 text-xl text-secondary">Description</th>
                <th className="py-6 text-xl text-secondary">Category</th>
                <th className="py-6 text-xl text-secondary">Price</th>
              </tr>
            </thead>
            <tbody className="">
              {Products.map((product) => (
                <tr key={product.id} className="text-center">
                  <td>
                    <img
                      src={product.imageUrl}
                      alt={product.title}
                      className="object-cover w-10 h-10 m-auto"
                    />
                  </td>
                  <td>{product.title}</td>
                  <td>
                    <TextSummarizer text={product.description} maxChars={10} />
                  </td>
                  <td>
                    <CategoryIdToName Id={product.categoryId} />
                  </td>
                  <td>{FormatCurrency(product.price)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default AdminProduct;
