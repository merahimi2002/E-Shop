"use client";

import { useSession } from "next-auth/react";
import { FaUser, FaRegHeart, FaHeart, FaShopify } from "react-icons/fa";
import { FiShoppingCart, FiEdit } from "react-icons/fi";
import { TbLogin2, TbLogout } from "react-icons/tb";
import { RiAdminLine } from "react-icons/ri";
import { BsCashCoin } from "react-icons/bs";
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
      <div>
        {status === "loading" && (
          <span className="loading loading-spinner loading-md text-white mt-2"></span>
        )}
        {status === "authenticated" && (
          <div className="dropdown dropdown-end z-50">
            <div tabIndex={0} role="button">
              {session.user?.image ? (
                <div className="mt-2">
                  <div className="ring-primary ring-offset-white w-8 h-8 rounded-full ring ring-offset-2 overflow-hidden">
                    <img
                      className="w-8 h-9 rounded-full object-cover"
                      src={session.user.image}
                    />
                  </div>
                </div>
              ) : (
                <div className="avatar placeholder border-2 bg-[#3b814f] rounded-full flex flex-center w-9 h-9">
                  <div className="text-white text-xl p-3">
                    <span>{session.user?.email!.charAt(0).toUpperCase()}</span>
                  </div>
                </div>
              )}
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-72 p-2 shadow"
            >
              <div className="flex flex-center">
                <h2 className="text-secondary font-semibold mt-2 mb-4 text-xl border-b-2 border-primary pb-2">
                  Manage your Account
                </h2>
              </div>
              <li>
                <div className="flex items-center">
                  <FaUser className="text-secondary text-xl" />
                  <h2 className="text-base-200 text-base">
                    {session.user?.email}
                  </h2>
                </div>
              </li>
              <li>
                <Link href="/auth/signup/edit">
                  <FiEdit className="text-secondary text-xl" />
                  <h2 className="text-base-200 text-base">Edit</h2>
                </Link>
              </li>
              <li>
                <Link href="/auth/signout">
                  <TbLogout className="text-secondary text-2xl" />
                  <h2 className="text-base-200 text-base"> Sign Out</h2>
                </Link>
              </li>
            </ul>
          </div>
        )}
        {status === "unauthenticated" && (
          <Link href="/auth/login">
            <TbLogin2 className="text-white h-8 w-8" />
          </Link>
        )}
      </div>
      <div className="dropdown dropdown-end z-50">
        <div tabIndex={0} role="button">
          <div className="indicator">
            <FaRegHeart className="text-white h-8 w-8" />
            <span className="badge badge-sm badge-secondary indicator-item">
              +8
            </span>
          </div>
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-[1] w-48 p-2 shadow"
        >
          <li>
            <div className="flex items-center">
              <FaHeart className="text-secondary text-xl" />
              <h2 className="text-base-200 text-base">10 Item</h2>
            </div>
          </li>
          <li>
            <Link href="/auth/signup/edit">
              <BsCashCoin className="text-accent text-xl" />
              <h2 className="text-base-200 text-base">$999.2 </h2>
            </Link>
          </li>
          <li>
            <div className="read-more w-full mt-4">View Cart</div>
          </li>
        </ul>
      </div>
      <div className="dropdown dropdown-end z-50">
        <div tabIndex={0} role="button">
          <div className="indicator">
            <FiShoppingCart className="text-white h-8 w-8" />
            <span className="badge badge-sm badge-secondary indicator-item">
              +7
            </span>
          </div>
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-[1] w-48 p-2 shadow"
        >
          <li>
            <div className="flex items-center">
              <FaShopify className="text-secondary text-xl" />
              <h2 className="text-base-200 text-base">10 Item</h2>
            </div>
          </li>
          <li>
            <Link href="/auth/signup/edit">
              <BsCashCoin className="text-accent text-xl" />
              <h2 className="text-base-200 text-base">$999.2 </h2>
            </Link>
          </li>
          <li>
            <div className="read-more w-full mt-4">View Cart</div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBarAction;
