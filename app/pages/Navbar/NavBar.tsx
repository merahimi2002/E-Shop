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

  const session = await getServerSession(authOptions);
  if (session) {
    const User = await prisma.user.findUnique({
      where: { email: session.user?.email! },
    });
    LoveCartCount = await prisma.loveCart.count({
      where: { userId: User?.id },
    });

    const LoveCartItems = await prisma.loveCart.findMany({
      where: { userId: User?.id },
    });
    const productIds = LoveCartItems.map((item) => item.productId).filter(
      (id): id is number => id !== null
    );
    const LoveCartPrice = await prisma.product.aggregate({
      where: { id: { in: productIds } },
      _sum: { price: true },
    });

    LoveCartTotalPrice = LoveCartPrice._sum.price?.toNumber() ?? 0;
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
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
