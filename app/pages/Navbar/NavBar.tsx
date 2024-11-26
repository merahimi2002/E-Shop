import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { RiMenu2Fill } from "react-icons/ri";
import Logo from "@/public/image/Logo.png";
import Image from "next/image";
import Link from "next/link";
import NavBarLinks from "./NavBarLinks";
import NavBarAction from "./NavBarAction";
import prisma from "@/prisma/client";

const NavBar = async () => {
  let LoveCartCount = 0;
  let LoveCartTotalPrice = 0;
  let ShopCartCount = 0;
  let ShopCartTotalPrice = "";

  const session = await getServerSession(authOptions);
  if (session) {
    const User = await prisma.user.findUnique({
      where: { email: session.user?.email! },
    });
    // Love Cart - Love Cart Count
    LoveCartCount = await prisma.loveCart.count({
      where: { userId: User?.id },
    });
    // Love Cart Count Total Price
    LoveCartTotalPrice = await prisma.loveCart
      .findMany({
        where: { userId: User?.id },
        include: { Product: true },
      })
      .then((items) =>
        items.reduce(
          (total, item) => total + (item.Product?.price.toNumber() ?? 0),
          0
        )
      );

    // Shop Cart - Shop Cart Count
    const ShopCartCountArray = await prisma.shopCart.aggregate({
      _sum: { quantity: true },
    });
    if (ShopCartCountArray._sum.quantity) {
      ShopCartCount = ShopCartCountArray._sum.quantity;
    }
    // Shop Cart - ShopCartTotalPrice
    const ShopCartProductArray = await prisma.shopCart.findMany({
      where: { userId: User?.id },
      include: { Product: true },
    });

    ShopCartTotalPrice = ShopCartProductArray.reduce(
      (total, item) =>
        total + item.quantity * (item.Product?.price?.toNumber() ?? 0),
      0
    ).toFixed(2);
  }

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
            <NavBarAction
              LoveCartCount={LoveCartCount}
              LoveCartTotalPrice={LoveCartTotalPrice}
              ShopCartCount={ShopCartCount}
              ShopCartTotalPrice={ShopCartTotalPrice}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
