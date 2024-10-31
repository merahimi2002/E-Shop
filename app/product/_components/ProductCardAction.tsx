"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { IoIosArrowDropright } from "react-icons/io";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import ModalsError from "@/app/components/ModalsError";
import Link from "next/link";
import axios from "axios";

interface ProductCardButtonsProps {
  categorySlug: string;
  slug: string;
  productId: Number;
  loveQuantity: boolean;
}

export const ProductCardButtons = ({
  categorySlug,
  slug,
  productId,
  loveQuantity,
}: ProductCardButtonsProps) => {
  const [LoveProduct, SetLoveProduct] = useState(loveQuantity);
  const { data: session } = useSession();
  const userEmail = session?.user?.email;
  const [error, setError] = useState("");
  const [isSubmiting, setIsSubmiting] = useState(false);
  const router = useRouter();
  const handleLoveClick = async () => {
    if (!userEmail) {
      setError("You don't have an account. Please Sign in ");
      throw new Error("User is not signed in.");
    }
    const Data = { productId, userEmail };
    try {
      setIsSubmiting(true);
      if (!loveQuantity) await axios.post("/api/cart/love", Data);
      else await axios.delete("/api/cart/love", { data: Data });
      SetLoveProduct(!LoveProduct);
      setIsSubmiting(false);
      router.refresh();
    } catch (error: any) {
      setIsSubmiting(false);
      setError(error.response.data.message || "an unexpected error occurred");
    }
  };
  return (
    <div className="flex gap-4 flex-center justify-between flex-row my-5">
      {error ? <ModalsError Message={error} Status={true} /> : null}
      <div className="read-more">Add To Cart</div>
      <div className="flex gap-3 items-center">
        {isSubmiting && (
          <span className="loading loading-spinner loading-md text-primary"></span>
        )}
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
