import { notFound } from "next/navigation";
import { FiEdit } from "react-icons/fi";
import prisma from "@/prisma/client";
import CategoryIdToName from "../_components/CategoryIdToName";
import FormatCurrency from "../_components/FormatCurrency";
import ReactMarkdown from "react-markdown";
import Link from "next/link";

interface Props {
  params: { details: string };
}

const ProductDetailsPage = async ({ params }: Props) => {
  const url = params.details.replace("%20", " ");
  const Products = await prisma.product.findMany({
    where: { title: String(url) },
  });

  if (!Products) {
    notFound();
  }

  return (
    <section>
      <div className="container">
        {Products.map((product) => (
          <div className="grid grid-cols-2 gap-6">
            <div className="col-span-2">
              <button className="btn btn-primary w-fit text-xl px-5 my-3">
                <FiEdit />
                <Link href={`/admin/product/update/${product.title}`}>Edit</Link>
              </button>
            </div>
            <div className="col-span-2 lg:col-span-1">
              <img
                src={product.imageUrl}
                alt={product.title}
                className="w-full object-contain rounded-xl"
              />
            </div>
            <div className="col-span-2 md:col-span-1">
              <h1 className="Titr">{product.title}</h1>
              <div className="text-accent">
                <CategoryIdToName Id={product.categoryId} />
              </div>
              <p className="text-secondary text-right text-lg font-medium">
                {FormatCurrency(product.price).toString()}
              </p>
              <div className="prose prose-neutral">
                <ReactMarkdown>{product.description}</ReactMarkdown>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductDetailsPage;
