"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavBarLinks = () => {
  const currentPath = usePathname();
  return (
    <>
      <li className={currentPath === "/" ? "text-secondary" : "lg:text-white"}>
        <Link href="/">Home</Link>
      </li>
      <li
        className={
          currentPath === "/about" ? "text-secondary" : "lg:text-white"
        }
      >
        <Link href="/about">About</Link>
      </li>
      <li
        className={
          currentPath === "/contact" ? "text-secondary" : "lg:text-white"
        }
      >
        <Link href="/">Contact</Link>
      </li>
      <li
        className={
          currentPath === "/product" ? "text-secondary" : "lg:text-white"
        }
      >
        <details>
          <summary className="active:remove-bg">
            <Link href="/product">Product</Link>
          </summary>
          <ul className="p-2 z-50">
            <li className="text-base-200">
              <Link href="/">Product_1</Link>
            </li>
            <li className="text-base-200">
              <Link href="/">Product_2</Link>
            </li>
          </ul>
        </details>
      </li>
    </>
  );
};

export default NavBarLinks;
