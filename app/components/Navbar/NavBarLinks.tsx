"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavBarLinks = () => {
  const currentPath = usePathname();
  console.log(currentPath);
  return (
    <>
      <li className={currentPath === "/" ? "text-white" : "text-gray"}>
        <Link href="/">Home</Link>
      </li>
      <li className={currentPath === "/about" ? "text-white" : "text-gray"}>
        <Link href="/">About</Link>
      </li>
      <li className={currentPath === "/contact" ? "text-white" : "text-gray"}>
        <Link href="/">Contact</Link>
      </li>
      <li className={currentPath === "/product" ? "text-white" : "text-gray"}>
        <details>
          <summary>
            <Link href="/">Product</Link>
          </summary>
          <ul className="p-2">
            <li>
              <Link href="/">Product_1</Link>
            </li>
            <li>
              <Link href="/">Product_2</Link>
            </li>
          </ul>
        </details>
      </li>
    </>
  );
};

export default NavBarLinks;
