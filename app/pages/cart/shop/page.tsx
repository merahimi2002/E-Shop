import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { notFound } from "next/navigation";
import prisma from "@/prisma/client";
import TextSummarizer from "@/app/product/_components/TextSummarizer";
import FormatCurrency from "@/app/product/_components/FormatCurrency";
import ShopCartAction from "./ShopCartAction";

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
    include: { Product: true },
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
            {ShopCartItems.map((ShopItem) => (
              <tr key={ShopItem.id} className="text-center">
                <td>
                  <img
                    src={ShopItem.Product?.imageUrl}
                    alt={ShopItem.Product?.title}
                    className="object-cover w-20 h-20 m-auto"
                  />
                </td>
                <td className="text-base-200">
                  {ShopItem.Product?.title.length! < 20 ? (
                    ShopItem.Product?.title
                  ) : (
                    <div
                      className="tooltip tooltip-primary"
                      data-tip={ShopItem.Product?.title}
                    >
                      <TextSummarizer
                        text={ShopItem.Product?.title!}
                        maxChars={20}
                      />
                    </div>
                  )}
                </td>
                <td className="text-accent text-2xl font-bold">
                  {FormatCurrency(ShopItem.Product?.price)}
                </td>
                <td>
                  <div className="flex flex-center flex-row gap-4">
                    <ShopCartAction
                      productId={ShopItem.productId!}
                      Quantity={ShopItem.quantity}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default CartPage;
