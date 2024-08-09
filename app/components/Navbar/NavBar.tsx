import Logo from "@/public/image/Logo.png";
import Image from "next/image";
import Link from "next/link";
import NavBarLinks from "./NavBarLinks";
import ThemeController from "./ThemeController";

const NavBar = () => {
  return (
    <div className="navbar bg-primary px-5 lg:px-10 ">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <NavBarLinks />
          </ul>
        </div>
        <Link href="/">
          <Image width={100} height={100} src={Logo} alt="Logo" priority/>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <NavBarLinks />
        </ul>
      </div>
      <div className="navbar-end">
        <ThemeController />
      </div>
    </div>
  );
};

export default NavBar;
