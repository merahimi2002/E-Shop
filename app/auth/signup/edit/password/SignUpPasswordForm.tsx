"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, signOut } from "next-auth/react";
import { useForm } from "react-hook-form";
import { ChangePasswordUserSchema } from "@/app/api/validation/validationSchema";
import { User } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { BsFillEnvelopeAtFill } from "react-icons/bs";
import { BiSolidLock } from "react-icons/bi";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FaUserPlus } from "react-icons/fa6";
import { FaStarOfLife ,FaKey } from "react-icons/fa";
import ErrorMessage from "@/app/components/ErrorMessage";
import axios from "axios";

type CategoryFormProps = z.infer<typeof ChangePasswordUserSchema>;

const SignUpPasswordForm = ({ user }: { user: User }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryFormProps>({
    resolver: zodResolver(ChangePasswordUserSchema),
  });
  // to relocated user
  const router = useRouter();
  // handling error
  const [error, setError] = useState("");
  const [isSubmiting, setIsSubmiting] = useState(false);
  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmiting(true);
      await axios.patch("/api/user/password/" + user.email, data);
      // update session
      await signOut({ redirect: false });
      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.newPassword,
      });
      if (result?.ok) {
        router.push("/auth/signup/edit");
      } else {
        setError("an unexpected session error occurred");
      }
      router.refresh();
    } catch (error: any) {
      setIsSubmiting(false);
      setError(error.response.data.message || "an unexpected error occurred");
    }
  });

  // password
  const [oldPassword, setOldPassword] = useState(false);
  const [newPassword, setNewPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);

  return (
    <section>
      <div className="container">
        <div className="flex flex-center m-auto w-full md:w-1/3 p-10 rounded-lg bg-gradient-to-b from-accent to-primary">
          <div className="flex flex-center flex-row gap-4 mb-5">
            <FaKey className="text-4xl text-primary m-auto" />
            <h2 className="text-3xl text-primary font-bold">password</h2>
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
              {/* old password */}
              <label className="custom-form-input w-full text-base-200 justify-between">
                <div className="flex flex-center flex-row gap-2 ">
                  <BiSolidLock className="text-secondary text-xl" />
                  <input
                    type={oldPassword ? "text" : "password"}
                    placeholder="Old Password"
                    {...register("oldPassword")}
                  />
                </div>
                <div className="flex flex-center flex-row gap-3">
                  <button
                    onClick={() =>
                      oldPassword ? setOldPassword(false) : setOldPassword(true)
                    }
                    type="button"
                  >
                    {oldPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                  <FaStarOfLife className="text-secondary text-xs" />
                </div>
              </label>
              {/* New Password */}
              <label className="custom-form-input w-full text-base-200 justify-between">
                <div className="flex flex-center flex-row gap-2 ">
                  <BiSolidLock className="text-secondary text-xl" />
                  <input
                    type={newPassword ? "text" : "password"}
                    placeholder="New Password"
                    {...register("newPassword")}
                  />
                </div>
                <div className="flex flex-center flex-row gap-3">
                  <button
                    onClick={() =>
                      newPassword ? setNewPassword(false) : setNewPassword(true)
                    }
                    type="button"
                  >
                    {newPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                  <FaStarOfLife className="text-secondary text-xs" />
                </div>
              </label>
              <ErrorMessage>{errors.newPassword?.message}</ErrorMessage>
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
                Update
                {isSubmiting && (
                  <span className="loading loading-spinner loading-md"></span>
                )}
              </button>
            </div>
          </form>
          <ErrorMessage>{error}</ErrorMessage>
        </div>
      </div>
    </section>
  );
};

export default SignUpPasswordForm;
