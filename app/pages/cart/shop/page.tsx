import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { notFound } from "next/navigation";
import prisma from "@/prisma/client";
import TextSummarizer from "@/app/product/_components/TextSummarizer";
import FormatCurrency from "@/app/product/_components/FormatCurrency";

const CartPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    notFound();
  }

  const User = await prisma.user.findUnique({
    where: { email: session.user?.email! },
  });
  const ShopCartItems = await prisma.shopCart.findMany({
    where: { userId: User?.id },
  });

  const productIds = ShopCartItems.map((item) => item.productId).filter(
    (id): id is number => id !== null
  );
  const Products = await prisma.product.findMany({
    where: { id: { in: productIds } },
  });
  return (
    <section>
      <div className="container">
        <table className="table table-auto table-striped table-hover thead-primary">
          <thead>
            <tr className="text-center">
              <th>Product</th>
              <th>Title</th>
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
                    className="object-cover w-20 h-20 m-auto"
                  />
                </td>
                <td className="text-base-200">
                  {product.title.length < 20 ? (
                    product.title
                  ) : (
                    <div
                      className="tooltip tooltip-primary"
                      data-tip={product.title}
                    >
                      <TextSummarizer text={product.title} maxChars={20} />
                    </div>
                  )}
                </td>
                <td className="text-accent text-2xl font-bold">
                  {FormatCurrency(product.price)}
                </td>
                <td>{/* <DeleteLoveCart productId={product.id} /> */}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default CartPage;
