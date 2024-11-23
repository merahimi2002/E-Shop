"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaPlus, FaMinus } from "react-icons/fa6";
import axios from "axios";

interface ShopCartActionProps {
  productId: number;
  quantity: number;
}

const ShopCartAction = ({ productId, quantity }: ShopCartActionProps) => {
  const { data: session } = useSession();
  const userEmail = session?.user?.email;

  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const DeleteCart = async () => {
    const Data = { quantity, productId, userEmail };
    try {
      setIsDeleting(true);
      await axios.delete("/api/cart/shop", { data: Data });
      router.refresh();
    } catch (error) {
      setIsDeleting(false);
    }
  };
  return (
    <div className="flex flex-center flex-row gap-4">
      {quantity <= 1 ? (
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
        <button className="btn btn-error w-fit text-lg px-4">
          {!isDeleting && <FaMinus />}
          {isDeleting && (
            <span className="loading loading-spinner loading-md"></span>
          )}
        </button>
      )}
      <h5 className="text-xl font-bold p-1">{quantity}</h5>
      <button className="btn btn-success text-white w-fit text-lg  px-4">
        {!isDeleting && <FaPlus />}
        {isDeleting && (
          <span className="loading loading-spinner loading-md"></span>
        )}
      </button>
    </div>
  );
};

export default ShopCartAction;
