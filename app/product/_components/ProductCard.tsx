import { PiShoppingCartLight } from "react-icons/pi";
import { FaRegHeart } from "react-icons/fa";
import { SlMagnifierAdd } from "react-icons/sl";
import Link from "next/link";
import TextSummarizer from "@/app/product/_components/TextSummarizer";
import FormatCurrency from "./FormatCurrency";

interface ProductCardProps {
  id: number;
  title: string;
  slug: string;
  description: string;
  imageUrl: string;
  price: any;
  categorySlug: string;
}

const ProductCard = ({
  id,
  title,
  slug,
  description,
  imageUrl,
  price,
  categorySlug,
}: ProductCardProps) => {
  return (
    <div
      className={`card border-2 border-primary overflow-hidden`}
      key={id}
    >
      <img className="w-full h-60 object-contain" src={imageUrl} alt={title} />
      <div className="card-body">
        <div className="card-title text-2xl text-secondary font-bold pb-4">
          <Link href={`/product/${categorySlug}/${slug}`}>
            <TextSummarizer text={title} maxChars={40} />
          </Link>
        </div>
        <div className="text-base-200 text-base">
          <TextSummarizer text={description} maxChars={100} />
        </div>
        <span className="text-accent text-right text-lg font-medium">
          {FormatCurrency(price).toString()}
        </span>
        <div className="flex gap-4 flex-center flex-row my-5">
          <button className="text-3xl font-semibold p-3 bg-primary bg-opacity-30 border-primary border-2 text-accent rounded-md hover:bg-accent hover:text-primary duration-300">
            <FaRegHeart />
          </button>
          <button className="text-3xl font-semibold p-3 bg-primary bg-opacity-30 border-primary border-2 text-accent rounded-md hover:bg-accent hover:text-primary duration-300">
            <PiShoppingCartLight />
          </button>
          <button className="text-3xl font-semibold p-3 bg-primary bg-opacity-30 border-primary border-2 text-accent rounded-md hover:bg-accent hover:text-primary duration-300">
            <SlMagnifierAdd />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
