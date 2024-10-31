import { ProductCardButtons, ProductCardStar } from "./ProductCardAction";
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
      className="card overflow-hidden shadow-[0_0_10px_#4c00b0_inset]"
      key={id}
    >
      <img
        className="w-full h-60 object-contain p-5"
        src={imageUrl}
        alt={title}
      />
      <div className="card-body">
        <div className="card-title text-2xl text-base-200 font-bold pb-4">
          <TextSummarizer text={title} maxChars={30} />
        </div>
        <div className="text-base">
          <TextSummarizer text={description} maxChars={60} />
        </div>
        <div className="flex gap-4 items-center justify-between my-4">
          <ProductCardStar />
          <span className="text-secondary text-right text-xl font-bold">
            {FormatCurrency(price).toString()}
          </span>
        </div>
        <ProductCardButtons categorySlug={categorySlug} slug={slug} productId={id} />
      </div>
    </div>
  );
};

export default ProductCard;
