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
  ShopQuantity: number;
}

export const ProductCardButtons = ({
  categorySlug,
  slug,
  productId,
  loveQuantity,
  ShopQuantity,
}: ProductCardButtonsProps) => {
  const [LoveProduct, SetLoveProduct] = useState(loveQuantity);
  const [ShopProduct, SetShopProduct] = useState(ShopQuantity);
  const { data: session } = useSession();
  const userEmail = session?.user?.email;
  const [error, setError] = useState("");
  const [isSubmitingLove, setIsSubmitingLove] = useState(false);
  const [isSubmitingShop, setIsSubmitingShop] = useState(false);
  const router = useRouter();
  const handleLoveClick = async () => {
    if (!userEmail) {
      setError("You don't have an account. Please Sign in ");
      throw new Error("User is not signed in.");
    }
    const Data = { productId, userEmail };
    try {
      setIsSubmitingLove(true);
      if (!loveQuantity) await axios.post("/api/cart/love", Data);
      else await axios.delete("/api/cart/love", { data: Data });
      SetLoveProduct(!LoveProduct);
      setIsSubmitingLove(false);
      router.refresh();
    } catch (error: any) {
      setIsSubmitingLove(false);
      setError(error.response.data.message || "an unexpected error occurred");
    }
  };
  const handleShopClick = async () => {
    if (!userEmail) {
      setError("You don't have an account. Please Sign in ");
      throw new Error("User is not signed in.");
    }
    const quantity = ShopQuantity + 1;
    const Data = { quantity, productId, userEmail };
    try {
      setIsSubmitingShop(true);
      await axios.post("/api/cart/shop", Data);
      SetShopProduct(quantity);
      setIsSubmitingShop(false);
      router.refresh();
    } catch (error: any) {
      setIsSubmitingShop(false);
      setError(error.response.data.message || "an unexpected error occurred");
    }
  };
  return (
    <div className="flex gap-4 flex-center justify-between flex-row my-5">
      {error ? <ModalsError Message={error} Status={true} /> : null}
      <button
        disabled={ShopProduct != 0}
        onClick={handleShopClick}
        className={
          ShopProduct != 0
            ? "read-more bg-gradient-to-br from-accent to-primary px-10 hover:custom-disabled"
            : "read-more"
        }
      >
        {isSubmitingShop && (
          <span className="loading loading-spinner loading-md text-primary mr-3"></span>
        )}
        {ShopProduct == 0 ? "Add To Cart" : "Added!"}
      </button>
      <div className="flex gap-3 items-center">
        {isSubmitingLove && (
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
