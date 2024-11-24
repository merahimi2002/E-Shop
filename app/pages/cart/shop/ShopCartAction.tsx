"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaPlus, FaMinus } from "react-icons/fa6";
import axios from "axios";

interface ShopCartActionProps {
  productId: number;
  Quantity: number;
}

const ShopCartAction = ({ productId, Quantity }: ShopCartActionProps) => {
  const { data: session } = useSession();
  const userEmail = session?.user?.email;

  const [isDeleting, setIsDeleting] = useState(false);
  const [isIncreasing, setIsIncreasing] = useState(false);
  const [isDecreasing, setIsDecreasing] = useState(false);
  const router = useRouter();

  const DeleteCart = async () => {
    const quantity = Quantity;
    const Data = { quantity, productId, userEmail };
    try {
      setIsDeleting(true);
      await axios.delete("/api/cart/shop", { data: Data });
      router.refresh();
    } catch (error) {
      setIsDeleting(false);
    }
  };
  const IncreaseCart = async () => {
    const quantity = Quantity + 1;
    const Data = { quantity, productId, userEmail };
    try {
      setIsIncreasing(true);
      await axios.patch("/api/cart/shop", Data);
      setIsIncreasing(false);
      router.refresh();
    } catch (error) {
      setIsIncreasing(false);
    }
  };
  const DecreaseCart = async () => {
    const quantity = Quantity - 1;
    const Data = { quantity, productId, userEmail };
    try {
      setIsDecreasing(true);
      await axios.patch("/api/cart/shop", Data);
      setIsDecreasing(false);
      router.refresh();
    } catch (error) {
      setIsDecreasing(false);
    }
  };
  return (
    <div className="flex flex-center flex-row gap-4">
      {Quantity <= 1 ? (
        <button
          onClick={DeleteCart}
          disabled={isDeleting}
          className="btn btn-error w-fit text-xl px-4"
        >
          {!isDeleting && <RiDeleteBin6Line />}
          {isDeleting && (
            <span className="loading loading-spinner loading-md"></span>
          )}
        </button>
      ) : (
        <button
          onClick={DecreaseCart}
          disabled={isDecreasing}
          className="btn btn-error w-fit text-lg px-4"
        >
          {!isDecreasing && <FaMinus />}
          {isDecreasing && (
            <span className="loading loading-spinner loading-md"></span>
          )}
        </button>
      )}
      <h5 className="text-xl font-bold p-1">{Quantity}</h5>
      <button
        onClick={IncreaseCart}
        disabled={isIncreasing}
        className="btn btn-success text-white w-fit text-lg  px-4"
      >
        {!isIncreasing && <FaPlus />}
        {isIncreasing && (
          <span className="loading loading-spinner loading-md"></span>
        )}
      </button>
    </div>
  );
};

export default ShopCartAction;
