"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CategorySchema } from "@/app/api/validation/validationSchema";
import { Category } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import { FaRegImage } from "react-icons/fa6";
import { MdDriveFileRenameOutline } from "react-icons/md";
import ErrorMessage from "@/app/components/ErrorMessage";
import axios from "axios";
import "easymde/dist/easymde.min.css";

type CategoryFormProps = z.infer<typeof CategorySchema>;

interface CloudinaryResult {
  public_id: string;
  url: string;
}

const CategoryForm = ({ category }: { category?: Category }) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CategoryFormProps>({
    resolver: zodResolver(CategorySchema),
  });
  // to relocated user
  const router = useRouter();
  // handling error
  const [error, setError] = useState("");
  const [isSubmiting, setIsSubmiting] = useState(false);
  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmiting(true);
      if (category) await axios.patch("/api/category/" + category.slug, data);
      else await axios.post("/api/category", data);
      router.push("/admin/category");
      router.refresh();
    } catch (error: any) {
      setIsSubmiting(false);
      setError(error.response.data.message || "an unexpected error occurred");
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

  // give cloudinary image
  const [publicId, setPublicId] = useState("");
  return (
    <section>
      <div className="container">
        <ErrorMessage>{error}</ErrorMessage>
        <form onSubmit={onSubmit}>
          <div className="flex flex-col gap-3 my-5">
            {/* title */}
            <label className="custom-form-input">
              <MdDriveFileRenameOutline />
              <input
                type="text"
                placeholder="Name"
                {...register("title")}
                defaultValue={category?.title}
              />
            </label>
            <ErrorMessage>{errors.title?.message}</ErrorMessage>
            {/* {slug} */}
            <ErrorMessage>{errors.slug?.message}</ErrorMessage>
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
            {/* for update */}
            {category && !publicId && (
              <>
                <img width={170} height={10} src={category.imageUrl} />
                {setValue("imageUrl", category.imageUrl)}
              </>
            )}
            {/* button */}
            <button
              disabled={isSubmiting}
              className="btn btn-secondary w-fit mt-5"
            >
              {category ? "Update Category" : "Add New Category"}
              {isSubmiting && (
                <span className="loading loading-spinner loading-md"></span>
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CategoryForm;
