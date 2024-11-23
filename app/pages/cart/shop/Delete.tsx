"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { RiDeleteBin6Line } from "react-icons/ri";
import axios from "axios";

interface DeleteShopCartProps {
  productId: number;
  quantity: number;
}

const DeleteShopCart = ({ productId, quantity }: DeleteShopCartProps) => {
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
  );
};

export default DeleteShopCart;
