import { RiMenu2Fill } from "react-icons/ri";
import Logo from "@/public/image/Logo.png";
import Image from "next/image";
import Link from "next/link";
import NavBarLinks from "./NavBarLinks";
import NavBarAction from "./NavBarAction";

const NavBar = () => {
  return (
    <div className="bg-primary">
      <div className="container">
        <div className="navbar p-0">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <RiMenu2Fill size={30} className="text-white" />
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow z-50"
              >
                <NavBarLinks />
              </ul>
            </div>
            <Link href="/">
              <Image src={Logo} alt="Logo" priority style={{ width: "50%" }} />
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 m-0">
              <NavBarLinks />
            </ul>
          </div>
          <div className="navbar-end">
            <NavBarAction />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
