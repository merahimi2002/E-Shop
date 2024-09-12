"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { UserSchema } from "@/app/api/validation/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import { BsFillEnvelopeAtFill, BsPhoneFill } from "react-icons/bs";
import { BiSolidLock } from "react-icons/bi";
import { FaUser, FaAddressCard, FaRegImage } from "react-icons/fa";
import ErrorMessage from "@/app/components/ErrorMessage";
import axios from "axios";

type CategoryFormProps = z.infer<typeof UserSchema>;

interface CloudinaryResult {
  public_id: string;
  url: string;
}

const UserForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CategoryFormProps>({
    resolver: zodResolver(UserSchema),
  });
  // to relocated user
  const router = useRouter();
  // handling error
  const [error, setError] = useState("");
  const [isSubmiting, setIsSubmiting] = useState(false);
  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmiting(true);
      await axios.post("/api/user", data);
      router.push("/admin/user");
      router.refresh();
    } catch (error: any) {
      setIsSubmiting(false);
      setError(error.response.data.message || "an unexpected error occurred");
    }
  });

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
          setValue("image", info.url);
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
      {publicId == "" && <ErrorMessage>{errors.image?.message}</ErrorMessage>}
    </>
  );
  return (
    <section>
      <div className="container">
        <ErrorMessage>{error}</ErrorMessage>
        <form onSubmit={onSubmit}>
          <div className="flex flex-col gap-3 my-5">
            {/* Email */}
            <label className="custom-form-input">
              <BsFillEnvelopeAtFill />
              <input type="email" placeholder="Email" {...register("email")} />
            </label>
            <ErrorMessage>{errors.email?.message}</ErrorMessage>
            {/* First Name */}
            <label className="custom-form-input">
              <FaUser />
              <input
                type="text"
                placeholder="First Name"
                {...register("firstName")}
              />
            </label>
            <ErrorMessage>{errors.firstName?.message}</ErrorMessage>
            {/* Last Name */}
            <label className="custom-form-input">
              <FaUser />
              <input
                type="text"
                placeholder="Last Name"
                {...register("lastName")}
              />
            </label>
            <ErrorMessage>{errors.lastName?.message}</ErrorMessage>
            {/* Address */}
            <label className="custom-form-input">
              <FaAddressCard />
              <input
                type="text"
                placeholder="Address"
                {...register("address")}
              />
            </label>
            <ErrorMessage>{errors.address?.message}</ErrorMessage>
            {/* Phone */}
            <label className="custom-form-input">
              <BsPhoneFill />
              <input type="number" placeholder="Phone" {...register("phone")} />
            </label>
            <ErrorMessage>{errors.phone?.message}</ErrorMessage>
            {/* image */}
            {UploadImage}
            {/* Password */}
            <label className="custom-form-input">
              <BiSolidLock />
              <input
                type="password"
                placeholder="Password"
                {...register("password")}
              />
            </label>

            <ErrorMessage>{errors.password?.message}</ErrorMessage>
            {/* Confirm Password */}
            <label className="custom-form-input">
              <BiSolidLock />
              <input
                type="password"
                placeholder="Confirm Password"
                {...register("confirmPassword")}
              />
            </label>
            <ErrorMessage>{errors.confirmPassword?.message}</ErrorMessage>
            {/* button */}
            <button
              disabled={isSubmiting}
              className="btn btn-secondary w-fit mt-5"
            >
              Add New User
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

export default UserForm;
