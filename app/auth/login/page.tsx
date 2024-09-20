"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoPersonCircleOutline } from "react-icons/io5";
import { IoIosLock } from "react-icons/io";
import { FaUserLarge } from "react-icons/fa6";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { signIn, useSession } from "next-auth/react";
import ErrorMessage from "@/app/components/ErrorMessage";
import Link from "next/link";

const LoginPage = () => {
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const [error, setError] = useState("");
  const [password, setPassword] = useState(false);
  const { status, data: session } = useSession();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });
      if (result?.ok) {
        router.push("/");
      } else {
        setError("Username or Password is not correct.");
      }
    } catch (error) {
      setError("an unexpected error occurred");
    }
  });

  return (
    <section>
      <div className="container flex flex-center">
        <div className="flex flex-center m-auto w-full md:w-2/3  border-solid border-primary border-2 rounded-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <img
              src="https://res.cloudinary.com/eshop-project/image/upload/v1725644417/Login_lzzncl.png"
              alt="login"
              className="w-full h-full object-contain p-4 bg-gradient-to-b from-accent to-primary"
            />
            <div className="py-4 px-8">
              <IoPersonCircleOutline className="text-8xl text-primary m-auto" />

              <form onSubmit={onSubmit}>
                <div className="flex flex-col gap-3 my-5">
                  {/* Email */}
                  <label className="custom-form-input w-full">
                    <FaUserLarge />
                    <input
                      type="email"
                      placeholder="Email"
                      defaultValue={status === "authenticated" ? session.user?.email ?? "" : ""}
                      {...register("email")}
                    />
                  </label>
                  {/* Password */}
                  <label className="custom-form-input w-full justify-between">
                    <div className="flex flex-center flex-row gap-2">
                      <IoIosLock size={20} />
                      <input
                        type={password ? "text" : "password"}
                        placeholder="Password"
                        {...register("password")}
                      />
                    </div>
                    <button
                      onClick={() =>
                        password ? setPassword(false) : setPassword(true)
                      }
                      type="button"
                    >
                      {password ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </label>
                  {/* general error */}
                  <div className="-mb-7 mt-4">
                    <ErrorMessage>{error}</ErrorMessage>
                  </div>
                  {/* button */}
                  <button className="text-xl read-more w-full mt-5 rounded-lg">
                    Login
                  </button>
                  <p className="text-center mt-4">
                    Don't have an account yet ?{" "}
                    <Link href="/auth/signup">Sign Up</Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
