"use client";

import { useSession } from "next-auth/react";
import { RiAdminLine } from "react-icons/ri";
import { TbLogout, TbLogin2 } from "react-icons/tb";
import Link from "next/link";
import ThemeController from "./ThemeController";

const NavBarAction = () => {
  const { status, data: session } = useSession();
  return (
    <div className="flex gap-4 justify-center items-center">
      <Link href="/admin">
        <RiAdminLine className="text-white h-8 w-8" />
      </Link>
      <ThemeController />
      <div className="">
        {status === "loading" && (
          <span className="loading loading-spinner loading-md text-white"></span>
        )}
        {status === "authenticated" && (
          <Link href="/api/auth/signout">
            <TbLogout className="text-white h-8 w-8" />
          </Link>
        )}
        {status === "unauthenticated" && (
          <Link href="/api/auth/signin">
            <TbLogin2 className="text-white h-8 w-8" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavBarAction;
