"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavBarLinks = () => {
  const currentPath = usePathname();
  return (
    <>
      <li className={currentPath === "/" ? "text-secondary" : "text-white"}>
        <Link href="/">Home</Link>
      </li>
      <li className={currentPath === "/about" ? "text-secondary" : "text-white"}>
        <Link href="/">About</Link>
      </li>
      <li className={currentPath === "/contact" ? "text-secondary" : "text-white"}>
        <Link href="/">Contact</Link>
      </li>
      <li className={currentPath === "/product" ? "text-secondary" : "text-white"}>
        <details>
          <summary>
            <Link href="/">Product</Link>
          </summary>
          <ul className="p-2">
            <li className="text-neutral">
              <Link href="/">Product_1</Link>
            </li>
            <li className="text-neutral">
              <Link href="/">Product_2</Link>
            </li>
          </ul>
        </details>
      </li>
    </>
  );
};

export default NavBarLinks;
