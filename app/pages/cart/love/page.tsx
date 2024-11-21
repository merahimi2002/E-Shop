import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { notFound } from "next/navigation";
import prisma from "@/prisma/client";
import TextSummarizer from "@/app/product/_components/TextSummarizer";
import FormatCurrency from "@/app/product/_components/FormatCurrency";
import DeleteLoveCart from "./Delete";

const LovePage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    notFound();
  }

  const User = await prisma.user.findUnique({
    where: { email: session.user?.email! },
  });
  const LoveCartItems = await prisma.loveCart.findMany({
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
            {LoveCartItems.map((LoveItem) => (
              <tr key={LoveItem.id} className="text-center">
                <td>
                  <img
                    src={LoveItem.Product?.imageUrl}
                    alt={LoveItem.Product?.title}
                    className="object-cover w-20 h-20 m-auto"
                  />
                </td>
                <td className="text-base-200">
                  {LoveItem.Product?.title.length! < 20 ? (
                    LoveItem.Product?.title
                  ) : (
                    <div
                      className="tooltip tooltip-primary"
                      data-tip={LoveItem.Product?.title}
                    >
                      <TextSummarizer text={LoveItem.Product?.title!} maxChars={20} />
                    </div>
                  )}
                </td>
                <td className="text-accent text-2xl font-bold">
                  {FormatCurrency(LoveItem.Product?.price)}
                </td>
                <td>
                  <DeleteLoveCart productId={LoveItem.Product?.id!} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default LovePage;
