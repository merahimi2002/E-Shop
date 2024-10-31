"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { IoIosArrowDropright } from "react-icons/io";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import Link from "next/link";
import axios from "axios";

interface ProductCardButtonsProps {
  categorySlug: string;
  slug: string;
  productId: Number;
}

export const ProductCardButtons = ({
  categorySlug,
  slug,
  productId,
}: ProductCardButtonsProps) => {
  const [LoveProduct, SetLoveProduct] = useState(false);
  const { data: session } = useSession();
  const userEmail = session?.user?.email;

  const handleLoveClick = async () => {
    if (!userEmail) return;

    const Data = { productId, userEmail };

    try {
      SetLoveProduct(!LoveProduct);
      console.log(Data)
      await axios.post("/api/cart/love", Data)
    } catch (error) {
      console.error("Error updating love status:", error);
      SetLoveProduct((prev) => !prev);
    }
  };
  return (
    <div className="flex gap-4 flex-center justify-between flex-row my-5">
      <div className="read-more">Add To Cart</div>
      <div className="flex gap-3 items-center">
        <button onClick={handleLoveClick} className="text-primary text-3xl">
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
