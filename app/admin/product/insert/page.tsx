"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createProductSchema } from "@/app/api/validation/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import { FaRegImage } from "react-icons/fa6";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { PiCoinsThin } from "react-icons/pi";
import ErrorMessage from "@/app/components/ErrorMessage";
import axios from "axios";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

type InsertProductProps = z.infer<typeof createProductSchema>;

interface CloudinaryResult {
  public_id: string;
  url: string;
}

interface CategoryInsertProduct {
  id: number;
  title: string;
}

const InsertProduct = () => {
  const {
    register,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<InsertProductProps>({
    resolver: zodResolver(createProductSchema),
  });
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmiting, setIsSubmiting] = useState(false);
  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmiting(true);
      await axios.post("/api/product", data);
      router.push("/");
    } catch (error) {
      setIsSubmiting(false);
      setError("an unexpected error occurred");
    }
  });
  const [publicId, setPublicId] = useState("");
  const [categories, setCategories] = useState<CategoryInsertProduct[]>([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/category");
        setCategories(response.data);
      } catch (error) {
        setError("Failed to load categories");
      }
    };
    fetchCategories();
  }, []);

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
          {/* description */}
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <SimpleMDE
                placeholder="Description"
                className="w-full md:w-1/3"
                {...field}
              />
            )}
          />
          <ErrorMessage>{errors.description?.message}</ErrorMessage>
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
          {/* price*/}
          <label className="custom-form-input">
            <PiCoinsThin />
            <input
              type="number"
              placeholder="Price"
              {...register("price", { valueAsNumber: true })}
            />
          </label>
          <ErrorMessage>{errors.price?.message}</ErrorMessage>
          {/* category */}
          <select
            className="select custom-form-input"
            {...register("categoryId", { valueAsNumber: true })}
          >
            <option value="" disabled>
              Select a Category
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.title}
              </option>
            ))}
          </select>
          <ErrorMessage>{errors.categoryId?.message}</ErrorMessage>
          <button
            disabled={isSubmiting}
            className="btn btn-secondary w-fit mt-5"
          >
            Add New Product
            {isSubmiting && (
              <span className="loading loading-spinner loading-md"></span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default InsertProduct;
