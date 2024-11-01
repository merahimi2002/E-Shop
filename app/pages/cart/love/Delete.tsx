"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { RiDeleteBin6Line } from "react-icons/ri";
import axios from "axios";

const DeleteLoveCart = ({ productId }: { productId: number }) => {
  const { data: session } = useSession();
  const userEmail = session?.user?.email;

  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const DeleteCart = async () => {
    const Data = { productId, userEmail };
    try {
      setIsDeleting(true);
      await axios.delete("/api/cart/love", { data: Data });
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
      <RiDeleteBin6Line />
      {isDeleting && (
        <span className="loading loading-spinner loading-md"></span>
      )}
    </button>
  );
};

export default DeleteLoveCart;
