"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createCategorySchema } from "@/app/api/validation/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import { FaRegImage } from "react-icons/fa6";
import { MdDriveFileRenameOutline } from "react-icons/md";
import ErrorMessage from "@/app/components/ErrorMessage";
import axios from "axios";
import "easymde/dist/easymde.min.css";

type InsertCategoryProps = z.infer<typeof createCategorySchema>;

interface CloudinaryResult {
  public_id: string;
  url: string;
}

const InsertCategory = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<InsertCategoryProps>({
    resolver: zodResolver(createCategorySchema),
  });
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmiting, setIsSubmiting] = useState(false);
  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmiting(true);
      await axios.post("/api/category", data);
      router.push("/");
    } catch (error) {
      setIsSubmiting(false);
      setError("an unexpected error occurred");
    }
  });
  const [publicId, setPublicId] = useState("");
  return (
    <div className="container my-4">
      <ErrorMessage>{error}</ErrorMessage>
      <form onSubmit={onSubmit}>
        <div className="flex flex-col gap-3 my-5">
          {/* title */}
          <label className="custom-form-input">
            <MdDriveFileRenameOutline />
            <input type="text" placeholder="Name" {...register("title")} />
          </label>
          <ErrorMessage>{errors.title?.message}</ErrorMessage>
          {/* imageUrl */}
          <CldUploadWidget
            uploadPreset="DBimage"
            options={{
              sources: ["local"],
              multiple: false,
              maxFiles: 2,
              maxFileSize: 1000000,
            }}
            onSuccess={(result) => {
              const info = result.info as CloudinaryResult;
              setPublicId(info.public_id);
              setValue("imageUrl", info.url);
            }}
          >
            {({ open }) => (
              <label className="custom-form-input w-fit">
                <FaRegImage />
                <input placeholder="Upload Image" onClick={() => open()} />
              </label>
            )}
          </CldUploadWidget>
          {publicId && (
            <CldImage src={publicId} alt="pic" width={170} height={10} />
          )}
          {publicId == "" && (
            <ErrorMessage>{errors.imageUrl?.message}</ErrorMessage>
          )}
          {/* button */}
          <button
            disabled={isSubmiting}
            className="btn btn-secondary w-fit mt-5"
          >
            Add New Category
            {isSubmiting && (
              <span className="loading loading-spinner loading-md"></span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default InsertCategory;
