"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ProductSchema } from "@/app/api/validation/validationSchema";
import { Product } from "@prisma/client";
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

type ProductFormProps = z.infer<typeof ProductSchema>;

interface CategoryProductForm {
  id: number;
  title: string;
}

interface CloudinaryResult {
  public_id: string;
  url: string;
}

const ProductForm = ({ product }: { product?: Product }) => {
  const {
    register,
    control,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormProps>({
    resolver: zodResolver(ProductSchema),
  });
  // to relocated user
  const router = useRouter();
  // handling error
  const [error, setError] = useState("");
  const [isSubmiting, setIsSubmiting] = useState(false);
  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmiting(true);
      if (product) await axios.patch("/api/product/" + product.slug, data);
      else await axios.post("/api/product", data);
      router.push("/admin/product");
      router.refresh();
    } catch (error) {
      setIsSubmiting(false);
      setError("an unexpected error occurred");
    }
  });
  // set default value for slug
  const titleValue = watch("title");
  useEffect(() => {
    if (titleValue) {
      const slug = titleValue.toLowerCase().replace(/\s+/g, "-");
      setValue("slug", slug);
    }
  }, [titleValue, setValue]);

  // UploadImage to Cloudinary
  const [publicId, setPublicId] = useState("");

  const UploadImage = (
    <>
      <CldUploadWidget
        uploadPreset="DBimage"
        options={{
          sources: ["local"],
          multiple: false,
          maxFiles: 2,
          maxFileSize: 1000000, // 1 Mb
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
      {publicId == "" && <ErrorMessage>{error}</ErrorMessage>}
      {/* for update */}
      {product && !publicId && (
        <>
          <img width={170} height={10} src={product.imageUrl} />
          {setValue("imageUrl", product.imageUrl)}
        </>
      )}
    </>
  );

  // SelectCategory
  const [categories, setCategories] = useState<CategoryProductForm[]>([]);
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
  const SelectCategory = (
    <>
      <select
        className="select custom-form-input"
        {...register("categoryId", { valueAsNumber: true })}
        defaultValue={product?.categoryId?.toString()}
      >
        {!product ? <option disabled>Select a Category</option> : null}
        {/* for update */}
        {product?.categoryId && (
          <option disabled value={product.categoryId}>
            {categories.map((category) =>
              category.id === product.categoryId ? category.title : ""
            )}
          </option>
        )}
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.title}
          </option>
        ))}
      </select>
      <ErrorMessage>{errors.categoryId?.message}</ErrorMessage>
    </>
  );

  return (
    <div className="container my-4">
      <ErrorMessage>{error}</ErrorMessage>
      <form onSubmit={onSubmit}>
        <div className="flex flex-col gap-3 my-5">
          {/* title */}
          <label className="custom-form-input">
            <MdDriveFileRenameOutline />
            <input
              type="text"
              placeholder="Name"
              defaultValue={product?.title}
              {...register("title")}
            />
          </label>
          <ErrorMessage>{errors.title?.message}</ErrorMessage>
          {/* {slug} */}
          <ErrorMessage>{errors.slug?.message}</ErrorMessage>
          {/* description */}
          <Controller
            name="description"
            control={control}
            defaultValue={product?.description}
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
          {UploadImage}
          {/* price*/}
          <label className="custom-form-input">
            <PiCoinsThin />
            <input
              defaultValue={product ? Number(product?.price) : ""}
              placeholder="Price"
              {...register("price", { valueAsNumber: true })}
            />
          </label>
          <ErrorMessage>{errors.price?.message}</ErrorMessage>
          {/* category */}
          {SelectCategory}

          <button
            disabled={isSubmiting}
            className="btn btn-secondary w-fit mt-5"
          >
            {product ? "Update Product" : "Add New Product"}
            {isSubmiting && (
              <span className="loading loading-spinner loading-md"></span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
