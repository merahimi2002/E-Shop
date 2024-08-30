import { FiEdit } from "react-icons/fi";
import Link from "next/link";
import prisma from "@/prisma/client";
import DeleteProduct from "./_components/DeleteProduct";
import CategoryIdToName from "@/app/components/Product/CategoryIdToName";
import FormatCurrency from "@/app/components/Product/FormatCurrency";
import TextSummarizer from "@/app/components/Product/TextSummarizer";

const AdminProduct = async () => {
  const Products = await prisma.product.findMany();
  return (
    <section>
      <div className="container">
        <div className="overflow-x-auto">
          <div className="flex gap-4 mb-5">
            <Link href="/admin/product/create">
              <button className="btn btn-success text-base-200 w-fit text-xl px-4">
                New Product
              </button>
            </Link>
          </div>
          <table className="table table-auto table-striped table-hover thead-primary">
            <thead>
              <tr className="text-center">
                <th>Product</th>
                <th>Title</th>
                <th>Description</th>
                <th>Category</th>
                <th>Price</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
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
                  <td>
                    <div className="flex justify-center items-center gap-4">
                      <Link href={`/admin/product/update/${product.slug}`}>
                        <button className="btn btn-primary w-fit text-xl px-4">
                          <FiEdit />
                        </button>
                      </Link>
                      <DeleteProduct slug={product.slug} />
                    </div>
                  </td>
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
