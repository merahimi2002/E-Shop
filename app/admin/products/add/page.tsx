"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createProductSchema } from "@/app/api/validation/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { FaRegImage } from "react-icons/fa6";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { PiCoinsThin } from "react-icons/pi";
import ErrorMessage from "@/app/components/ErrorMessage";
import axios from "axios";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

type AddProductPageProps = z.infer<typeof createProductSchema>;

const AddProductPage = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AddProductPageProps>({
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
          <label className="custom-form-input">
            <FaRegImage />
            <input type="text" placeholder="Image" {...register("imageUrl")} />
          </label>
          <ErrorMessage>{errors.imageUrl?.message}</ErrorMessage>
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
          {/* <select className="select w-full md:w-1/3 input-bordered">
          <option disabled selected>
            Category
          </option>
          <option>Homer</option>
        </select> */}
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

export default AddProductPage;
