"use client";

import { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoCloseSharp } from "react-icons/io5";
import { MdError } from "react-icons/md";
import { useRouter } from "next/navigation";
import Modals from "../../components/Modals";
import axios from "axios";

const DeleteProductModale = ({ slug }: { slug: string }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const DeleteProduct = async () => {
    try {
      setIsDeleting(true);
      await axios.delete("/api/product/" + slug);
      router.push("/admin/product");
      router.refresh();
    } catch (error) {
      setIsDeleting(false);
      setError(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <button
        onClick={() => setIsModalOpen(true)}
        disabled={isDeleting}
        className="btn btn-error w-fit text-xl px-4"
      >
        <RiDeleteBin6Line />
        {isDeleting && (
          <span className="loading loading-spinner loading-md"></span>
        )}
      </button>
      <Modals isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="border-b-2 mb-4 border-base-200 border-opacity-15">
          <h2 className="text-2xl font-bold mb-3 text-primary text-left">
            Confirm Deletion
          </h2>
        </div>
        <p className="mb-4 text-lg text-left">
          Are you sure you want to delete this product ? This action cannot be
          undone
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => setIsModalOpen(false)}
            className="btn btn-primary bg-opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={DeleteProduct}
            disabled={error}
            className="btn btn-error"
          >
            Delete Product
          </button>
        </div>
        {error && (
          <div role="alert" className="alert alert-error mt-5">
            <MdError size={30} />
            <span>This product cannot be deleted .</span>
            <button
              onClick={() => setError(false)}
              className="btn btn-error btn-sm px-4"
            >
              <IoCloseSharp size={30} />
            </button>
          </div>
        )}
      </Modals>
    </div>
  );
};

export default DeleteProductModale;
