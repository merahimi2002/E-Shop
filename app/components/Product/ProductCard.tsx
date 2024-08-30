import Link from "next/link";
import CategoryIdToName from "./CategoryIdToName";
import TextSummarizer from "@/app/components/Product/TextSummarizer";
import FormatCurrency from "./FormatCurrency";

interface ProductCardProps {
  id: number;
  title: string;
  slug:string;
  description: string;
  imageUrl: string;
  price: any;
  categoryId: number | null;
}

const ProductCard = ({
  id,
  title,
  slug,
  description,
  imageUrl,
  price,
  categoryId,
}: ProductCardProps) => {
  return (
    <div
      className="card border-2 border-primary overflow-hidden bg-primary bg-opacity-30"
      key={id}
    >
      <img className="w-full h-60 object-cover" src={imageUrl} alt={title} />
      <div className="card-body">
        <div className="card-title text-xl text-primary font-semibold pb-4">
          <Link href={`/product/${slug}`}>
            <TextSummarizer text={title} maxChars={40} />
          </Link>
        </div>
        <span className="text-secondary text-right text-lg font-medium">
          {FormatCurrency(price).toString()}
        </span>
        <div className="text-accent">
          <CategoryIdToName Id={categoryId} />
        </div>
        <div className="text-white">
          <TextSummarizer text={description} maxChars={100} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
