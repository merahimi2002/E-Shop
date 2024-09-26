"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BsPersonFillX } from "react-icons/bs";
import { IoCloseSharp } from "react-icons/io5";
import { MdError } from "react-icons/md";
import Modals from "@/app/components/Modals";
import axios from "axios";

const MakeAdminUser = ({ email }: { email: string }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  const AdminUser = async () => {
    try {
      setIsAdmin(true);
      await axios.patch("/api/user/admin/" + email, { role: "USER" });
      setIsModalOpen(false);
      setIsAdmin(false);
      router.push("/admin/user");
      router.refresh();
    } catch (error) {
      setIsAdmin(false);
      setError(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <button
        onClick={() => setIsModalOpen(true)}
        disabled={isAdmin}
        className="btn btn-error text-white w-fit text-xl px-4"
      >
        <BsPersonFillX />
        {isAdmin && (
          <span className="loading loading-spinner loading-md"></span>
        )}
      </button>
      <Modals isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="border-b-2 mb-4 border-base-200 border-opacity-15">
          <h2 className="text-2xl font-bold mb-3 text-primary text-left">
            Confirmation
          </h2>
        </div>
        <p className="mb-4 text-lg text-left">
          Are you sure you want to Demote this admin to a user ? This action cannot
          be undone .
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => setIsModalOpen(false)}
            className="btn btn-primary bg-opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={AdminUser}
            disabled={error}
            className="btn btn-error text-white"
          >
            Yes
          </button>
        </div>
        {error && (
          <div role="alert" className="alert alert-error mt-5">
            <MdError size={30} />
            <span>This Admin cannot be a User .</span>
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

export default MakeAdminUser;
