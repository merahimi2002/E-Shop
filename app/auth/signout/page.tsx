"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { VscSignOut } from "react-icons/vsc";

const SignOutPage = () => {
  const router = useRouter();
  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };
  return (
    <section>
      <div className="container flex flex-center">
        <div className="flex flex-center m-auto w-fit border-solid border-primary border-2 rounded-lg overflow-hidden">
          <div className="p-8 flex flex-center bg-gradient-to-b from-accent to-primary">
            <VscSignOut className="text-8xl text-primary" />
            <p className="text-white text-xl my-5">
              Are you sure you want to sign out?
            </p>
            <button
              onClick={handleSignOut}
              className="btn btn-secondary text-white text-xl w-fit px-6 mt-4"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignOutPage;
