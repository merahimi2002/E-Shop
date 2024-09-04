import prisma from "@/prisma/client";
import Link from "next/link";

interface NavBarLinksDynamicProps {
  href: string;
  label: string;
}

const NavBarLinksDynamic = async ({ href, label }: NavBarLinksDynamicProps) => {
  const Categories = await prisma.category.findMany();
  return (
    <details>
      <summary className="active:remove-bg">
        <Link href={href}>{label}</Link>
      </summary>
      <ul className="p-2 z-50 w-60">
        {Categories.map((category) => (
          <li className="text-base-200" key={category.id}>
            <Link href={`/product/${category.slug}`}>{category.title}</Link>
          </li>
        ))}
      </ul>
    </details>
  );
};

const NavBarLinks = () => {
  const Links = [
    { href: "/", label: "Home", flag: false },
    { href: "/about", label: "About", flag: false },
    { href: "/contact", label: "Contact", flag: false },
    { href: "/product", label: "Product", flag: true },
  ];

  return (
    <>
      {Links.map((link) => (
        <li className="text-white" key={link.href}>
          {link.flag ? (
            <NavBarLinksDynamic href={link.href} label={link.label} />
          ) : (
            <Link href={link.href}>{link.label}</Link>
          )}
        </li>
      ))}
    </>
  );
};

export default NavBarLinks;
