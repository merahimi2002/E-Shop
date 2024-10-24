"use client";

import { useState } from "react";
import { IoIosArrowDropright } from "react-icons/io";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import Link from "next/link";

interface ProductCardButtonsProps {
  categorySlug: string;
  slug: string;
}

export const ProductCardButtons = ({
  categorySlug,
  slug,
}: ProductCardButtonsProps) => {
  const [LoveProduct, SetLoveProduct] = useState(false);
  return (
    <div className="flex gap-4 flex-center justify-between flex-row my-5">
      <div className="read-more">Add To Cart</div>
      <div className="flex gap-3 items-center">
        <button
          onClick={() => SetLoveProduct(!LoveProduct)}
          className="text-primary text-3xl"
        >
          {LoveProduct ? <FaHeart /> : <FaRegHeart />}
        </button>
        <div className="text-primary text-4xl duration-300 hover:text-accent">
          <Link href={`/product/${categorySlug}/${slug}`}>
            <IoIosArrowDropright />
          </Link>
        </div>
      </div>
    </div>
  );
};

export const ProductCardStar = () => {
  return (
    <div className="flex">
      <FaStar className="text-neutral text-xl" />
      <FaStar className="text-neutral text-xl" />
      <FaStar className="text-neutral text-xl" />
      <FaStar className="text-neutral text-xl" />
      <FaStar className="text-xl" />
    </div>
  );
};
