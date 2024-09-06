"use client";

import { useSession } from "next-auth/react";
import { RiAdminLine } from "react-icons/ri";
import { TbLogin2, TbLogout } from "react-icons/tb";
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
          <div className="dropdown dropdown-end z-50">
            <div tabIndex={0} role="button">
              {session.user?.image ? (
                <div className="avatar mt-2">
                  <div className="ring-primary ring-offset-white w-8 rounded-full ring ring-offset-2">
                    <img src={session.user.image} />
                  </div>
                </div>
              ) : (
                <div className="avatar placeholder border-2 bg-[#3b814f] rounded-full flex flex-center">
                  <div className="text-white text-xl p-3">
                    <span>{session.user?.email!.charAt(0).toUpperCase()}</span>
                  </div>
                </div>
              )}
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
            >
              <li>
                <p className="text-base-200 tetx-xl">{session.user?.email}</p>
              </li>
              <li>
                <Link href="/api/auth/signout">
                  <TbLogout className="text-base-200 h-8 w-8" />
                </Link>
              </li>
            </ul>
          </div>
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
