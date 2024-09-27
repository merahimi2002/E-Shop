"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, signOut } from "next-auth/react";
import { useForm } from "react-hook-form";
import { UpdateUserSchema } from "@/app/api/validation/validationSchema";
import { User } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import { BsFillEnvelopeAtFill, BsPhoneFill } from "react-icons/bs";
import { BiSolidLock } from "react-icons/bi";
import { FaUser, FaAddressCard, FaRegImage, FaKey } from "react-icons/fa";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FaUserPlus } from "react-icons/fa6";
import { FaStarOfLife } from "react-icons/fa";
import ErrorMessage from "@/app/components/ErrorMessage";
import axios from "axios";
import Link from "next/link";

type CategoryFormProps = z.infer<typeof UpdateUserSchema>;

interface CloudinaryResult {
  public_id: string;
  url: string;
}

const SignUpEditeForm = ({ user }: { user: User }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CategoryFormProps>({
    resolver: zodResolver(UpdateUserSchema),
  });
  // to relocated user
  const router = useRouter();
  // handling error
  const [error, setError] = useState("");
  const [isSubmiting, setIsSubmiting] = useState(false);
  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmiting(true);
      await axios.patch("/api/user/" + user.email, data);
      // update session
      await signOut({ redirect: false });
      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.Password,
      });
      if (result?.ok) {
        router.push("/");
      } else {
        setError("an unexpected session error occurred");
      }
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
      {/* for update */}
      {user && !publicId && (
        <>
          <img
            width={170}
            height={user.image ? 10 : 0}
            src={user.image?.toString()}
          />
          {setValue("image", user.image?.toString())}
        </>
      )}
    </>
  );
  // password
  const [Password, setPassword] = useState(false);
  return (
    <section>
      <div className="container">
        <div className="flex flex-center m-auto w-full md:w-1/3 p-10 rounded-lg bg-gradient-to-b from-accent to-primary">
          <div className="flex flex-center flex-row gap-4 mb-5">
            <FaUserPlus className="text-6xl text-primary m-auto" />
            <h2 className="text-3xl text-primary font-semibold">Sign Up</h2>
          </div>
          <form className="w-full" onSubmit={onSubmit}>
            <div className="flex flex-col gap-3 my-5">
              {/* Email */}
              <label className="custom-form-input w-full text-base-200 justify-between">
                <div className="flex flex-center flex-row gap-2">
                  <BsFillEnvelopeAtFill className="text-secondary text-xl" />
                  <input
                    type="email"
                    placeholder="Email"
                    defaultValue={user.email}
                    {...register("email")}
                    readOnly={user != undefined}
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
                  defaultValue={user.firstName?.toString()}
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
                  defaultValue={user.lastName?.toString()}
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
                  defaultValue={user.address?.toString()}
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
                  defaultValue={user.phone?.toString()}
                  {...register("phone")}
                />
              </label>
              <ErrorMessage>{errors.phone?.message}</ErrorMessage>
              {/* image */}
              {UploadImage}
              {/* password */}
              <label className="custom-form-input w-full text-base-200 justify-between">
                <div className="flex flex-center flex-row gap-2 ">
                  <BiSolidLock className="text-secondary text-xl" />
                  <input
                    type={Password ? "text" : "password"}
                    placeholder="Password"
                    {...register("Password")}
                  />
                </div>
                <div className="flex flex-center flex-row gap-3">
                  <button
                    onClick={() =>
                      Password ? setPassword(false) : setPassword(true)
                    }
                    type="button"
                  >
                    {Password ? <FiEyeOff /> : <FiEye />}
                  </button>
                  <FaStarOfLife className="text-secondary text-xs" />
                </div>
              </label>

              {/* button */}
              <div className="flex items-center justify-between">
                <button
                  disabled={isSubmiting}
                  className="btn btn-secondary w-fit mt-5 px-8 text-xl"
                >
                  Update
                  {isSubmiting && (
                    <span className="loading loading-spinner loading-md"></span>
                  )}
                </button>
                <Link
                  className="btn btn-success text-white w-fit mt-5 px-8 text-lg"
                  href="/auth/signup/edit/password"
                >
                  <FaKey />
                  Change Password
                </Link>
              </div>
            </div>
          </form>
          <ErrorMessage>{error}</ErrorMessage>
        </div>
      </div>
    </section>
  );
};

export default SignUpEditeForm;
