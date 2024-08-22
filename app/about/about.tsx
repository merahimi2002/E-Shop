"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoMdArrowRoundForward } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";

export const About = () => {
  const currentPath = usePathname();
  return (
    <section>
      <div className="container">
        <div className="grid grid-cols-6 gap-4">
          <div className="col-span-6 lg:col-span-3">
            <div className="image-border">
              <img
                src="https://res.cloudinary.com/eshop-project/image/upload/v1723968282/about_fyozhn.jpg"
                alt="about"
                className="image-border-img"
              />
            </div>
          </div>
          <div className="col-span-6 lg:col-span-3 mt-10 lg:mt-0">
            <h2 className="Titr mt-0">About Us</h2>
            <p className="w-full 2xl:w-3/4">
              Welcome to Electro Shop , your one-stop destination for the latest
              in laptops, computers, mobile devices, and tech accessories. We
              are passionate about technology and committed to providing our
              customers with top-quality products and exceptional service.
            </p>
            <p className="w-full 2xl:w-3/4 my-5">
              At Electro Shop, we believe in the power of technology to
              transform lives. Founded by tech enthusiasts, our mission is to
              bring the best and most reliable gadgets to our customers at
              competitive prices. Whether you're a professional, a student, a
              gamer, or someone looking to stay connected with the world, we
              have something for everyone.
            </p>
            {currentPath === "/about" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-0 2xl:mt-10">
                <div className="flex items-center">
                  <FaCheckCircle className="text-secondary" />
                  <p className="pl-2">What We Offer</p>
                </div>
                <div className="flex items-center">
                  <FaCheckCircle className="text-secondary" />
                  <p className="pl-2">Our Commitment</p>
                </div>
                <div className="flex items-center">
                  <FaCheckCircle className="text-secondary" />
                  <p className="pl-2">Our Vision</p>
                </div>
                <div className="flex items-center">
                  <FaCheckCircle className="text-secondary" />
                  <p className="pl-2">Why Choose Us?</p>
                </div>
              </div>
            ) : (
              <div className="hidden 2xl:grid grid-cols-2 gap-4 mt-0">
                <div className="flex items-center">
                  <FaCheckCircle className="text-secondary" />
                  <p className="pl-2">What We Offer</p>
                </div>
                <div className="flex items-center">
                  <FaCheckCircle className="text-secondary" />
                  <p className="pl-2">Our Commitment</p>
                </div>
                <div className="flex items-center">
                  <FaCheckCircle className="text-secondary" />
                  <p className="pl-2">Our Vision</p>
                </div>
                <div className="flex items-center">
                  <FaCheckCircle className="text-secondary" />
                  <p className="pl-2">Why Choose Us?</p>
                </div>
              </div>
            )}

            <Link
              className={
                currentPath === "/about" ? "hidden" : "read-more mt-5 2xl:mt-10"
              }
              href="/about"
            >
              Read More <IoMdArrowRoundForward className="mt-1" size="23" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
