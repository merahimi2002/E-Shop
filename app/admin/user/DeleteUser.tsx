"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoCloseSharp } from "react-icons/io5";
import { MdError } from "react-icons/md";
import Modals from "@/app/components/Modals";
import axios from "axios";

const DeleteUser = ({ email }: { email: string }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  const DeleteUser = async () => {
    try {
      setIsDeleting(true);
      await axios.delete("/api/user/" + email);
      if (session?.user?.email === email) await signOut();
      router.push("/admin/user");
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
          Are you sure you want to delete this User ? This action remove this
          User and cannot be undone .
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => setIsModalOpen(false)}
            className="btn btn-primary bg-opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={DeleteUser}
            disabled={error}
            className="btn btn-error"
          >
            Delete User
          </button>
        </div>
        {error && (
          <div role="alert" className="alert alert-error mt-5">
            <MdError size={30} />
            <span>This User cannot be deleted .</span>
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

export default DeleteUser;
