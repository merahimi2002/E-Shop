"use client";

import { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import Modals from "../../components/Modals";

const AlartModals = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center">
      <button
        onClick={() => setIsModalOpen(true)}
        className="btn btn-error w-fit text-xl px-5 my-3"
      >
        <RiDeleteBin6Line />
        Delete
      </button>
      <Modals isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="border-b-2 mb-4 border-base-200 border-opacity-15">
          <h2 className="text-2xl font-bold mb-3 text-primary">
            Confirm Deletion
          </h2>
        </div>
        <p className="mb-4 text-lg">
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
          <button className="btn btn-error">Delete Product</button>
        </div>
      </Modals>
    </div>
  );
};

export default AlartModals;
