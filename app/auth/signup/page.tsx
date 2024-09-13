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
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FaUserPlus } from "react-icons/fa6";
import { FaStarOfLife } from "react-icons/fa";
import ErrorMessage from "@/app/components/ErrorMessage";
import axios from "axios";

type CategoryFormProps = z.infer<typeof UserSchema>;

interface CloudinaryResult {
  public_id: string;
  url: string;
}

const SignUp = () => {
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
      router.push("/");
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
          <label className="custom-form-input w-full text-base-200">
            <FaRegImage className="text-secondary text-xl" />
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
  // password
  const [password, setPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);
  return (
    <section>
      <div className="container">
        <div className="flex flex-center m-auto w-full md:w-1/3 p-10 rounded-lg bg-gradient-to-b from-accent to-primary">
          <div className="flex flex-center flex-row gap-4 mb-5">
            <FaUserPlus className="text-6xl text-primary m-auto" />
            <h2 className="text-3xl text-primary font-semibold">Sign Up</h2>
          </div>
          <ErrorMessage>{error}</ErrorMessage>
          <form className="w-full" onSubmit={onSubmit}>
            <div className="flex flex-col gap-3 my-5">
              {/* Email */}
              <label className="custom-form-input w-full text-base-200 justify-between">
                <div className="flex flex-center flex-row gap-2">
                  <BsFillEnvelopeAtFill className="text-secondary text-xl" />
                  <input
                    type="email"
                    placeholder="Email"
                    {...register("email")}
                  />
                </div>
                <FaStarOfLife className="text-secondary text-xs" />
              </label>
              <ErrorMessage>{errors.email?.message}</ErrorMessage>
              {/* First Name */}
              <label className="custom-form-input w-full text-base-200">
                <FaUser className="text-secondary text-xl" />
                <input
                  type="text"
                  placeholder="First Name"
                  {...register("firstName")}
                />
              </label>
              <ErrorMessage>{errors.firstName?.message}</ErrorMessage>
              {/* Last Name */}
              <label className="custom-form-input w-full text-base-200">
                <FaUser className="text-secondary text-xl" />
                <input
                  type="text"
                  placeholder="Last Name"
                  {...register("lastName")}
                />
              </label>
              <ErrorMessage>{errors.lastName?.message}</ErrorMessage>
              {/* Address */}
              <label className="custom-form-input w-full text-base-200">
                <FaAddressCard className="text-secondary text-xl" />
                <input
                  type="text"
                  placeholder="Address"
                  {...register("address")}
                />
              </label>
              <ErrorMessage>{errors.address?.message}</ErrorMessage>
              {/* Phone */}
              <label className="custom-form-input w-full text-base-200">
                <BsPhoneFill className="text-secondary text-xl" />
                <input
                  type="number"
                  placeholder="Phone"
                  {...register("phone")}
                />
              </label>
              <ErrorMessage>{errors.phone?.message}</ErrorMessage>
              {/* image */}
              {UploadImage}
              {/* Password */}
              <label className="custom-form-input w-full text-base-200 justify-between">
                <div className="flex flex-center flex-row gap-2 ">
                  <BiSolidLock className="text-secondary text-xl" />
                  <input
                    type={password ? "text" : "password"}
                    placeholder="Password"
                    {...register("password")}
                  />
                </div>
                <div className="flex flex-center flex-row gap-3">
                  <button
                    onClick={() =>
                      password ? setPassword(false) : setPassword(true)
                    }
                    type="button"
                  >
                    {password ? <FiEyeOff /> : <FiEye />}
                  </button>
                  <FaStarOfLife className="text-secondary text-xs" />
                </div>
              </label>
              <ErrorMessage>{errors.password?.message}</ErrorMessage>
              {/* Confirm Password */}
              <label className="custom-form-input w-full text-base-200 justify-between">
                <div className="flex flex-center flex-row gap-2 ">
                  <BiSolidLock className="text-secondary text-xl" />
                  <input
                    type={confirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    {...register("confirmPassword")}
                  />
                </div>
                <div className="flex flex-center flex-row gap-3">
                  <button
                    onClick={() =>
                      confirmPassword
                        ? setConfirmPassword(false)
                        : setConfirmPassword(true)
                    }
                    type="button"
                  >
                    {confirmPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                  <FaStarOfLife className="text-secondary text-xs" />
                </div>
              </label>
              <ErrorMessage>{errors.confirmPassword?.message}</ErrorMessage>
              {/* button */}
              <button
                disabled={isSubmiting}
                className="btn btn-secondary w-fit mt-5 px-8 text-xl"
              >
                Submit
                {isSubmiting && (
                  <span className="loading loading-spinner loading-md"></span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
