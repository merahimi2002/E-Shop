"use client";

import { FaRegImage } from "react-icons/fa6";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { PiCoinsThin } from "react-icons/pi";
import { Controller, useForm } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";

interface AddProductPageProps {
  title: string;
  description: string;
  imageUrl: string;
  price: number;
}

const AddProductPage = () => {
  const { register, control, handleSubmit } = useForm<AddProductPageProps>();
  const router = useRouter();
  return (
    <form
      className="container"
      onSubmit={handleSubmit(async (data) => {
        await axios.post("/api/product", data);
        router.push("/");
      })}
    >
      <div className="flex flex-col gap-4 my-5">
        <label className="w-full md:w-1/3 input input-bordered flex items-center gap-2">
          <MdDriveFileRenameOutline />
          <input type="text" placeholder="Name" {...register("title")} />
        </label>
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
        <label className="w-full md:w-1/3 input input-bordered flex items-center gap-2">
          <FaRegImage />
          <input type="text" placeholder="Image" {...register("imageUrl")} />
        </label>
        <label className="w-full md:w-1/3 input input-bordered flex items-center gap-2">
          <PiCoinsThin />
          <input type="number" placeholder="Price" {...register("price", { valueAsNumber: true })} />
        </label>
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
  );
};

export default AddProductPage;
