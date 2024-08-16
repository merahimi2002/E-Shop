"use client";

import { createProductSchema } from "@/app/api/validation/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaRegImage } from "react-icons/fa6";
import { MdDriveFileRenameOutline, MdError } from "react-icons/md";
import { PiCoinsThin } from "react-icons/pi";
import SimpleMDE from "react-simplemde-editor";
import { z } from "zod";

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
  return (
    <div className="container my-4">
      {error && (
        <div role="alert" className="alert alert-error w-fit text-white">
          <MdError />
          <span>{error}</span>
        </div>
      )}
      <form
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post("/api/product", data);
            router.push("/");
          } catch (error) {
            setError("an unexpected error occurred");
          }
        })}
      >
        <div className="flex flex-col gap-4 my-5">
          <label className="w-full md:w-1/3 input input-bordered flex items-center gap-2">
            <MdDriveFileRenameOutline />
            <input type="text" placeholder="Name" {...register("title")} />
          </label>
          {errors.title && (
            <div
              role="alert"
              className="alert text-red-600 w-fit p-3 text-white"
            >
              <MdError />
              <span>{errors.title.message}</span>
            </div>
          )}
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
          {errors.description && (
            <div
              role="alert"
              className="alert text-red-600 w-fit p-3 text-white"
            >
              <MdError />
              <span>{errors.description.message}</span>
            </div>
          )}
          <label className="w-full md:w-1/3 input input-bordered flex items-center gap-2">
            <FaRegImage />
            <input type="text" placeholder="Image" {...register("imageUrl")} />
          </label>
          {errors.imageUrl && (
            <div
              role="alert"
              className="alert text-red-600 w-fit p-3 text-white"
            >
              <MdError />
              <span>{errors.imageUrl.message}</span>
            </div>
          )}
          <label className="w-full md:w-1/3 input input-bordered flex items-center gap-2">
            <PiCoinsThin />
            <input
              type="number"
              placeholder="Price"
              {...register("price", { valueAsNumber: true })}
            />
          </label>
          {errors.price && (
            <div
              role="alert"
              className="alert text-red-600 w-fit p-3 text-white"
            >
              <MdError />
              <span>{errors.price.message}</span>
            </div>
          )}
          {/* <select className="select w-full md:w-1/3 input-bordered">
          <option disabled selected>
            Category
          </option>
          <option>Homer</option>
        </select> */}
          <button className="btn btn-secondary w-fit mt-5">
            Add New Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProductPage;
