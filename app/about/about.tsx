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
        <div className="row">
          <div className="basis-full md:basis-1/2">
            <div className="image-border">
              <img
                src="https://res.cloudinary.com/eshop-project/image/upload/v1723968282/about_fyozhn.jpg"
                alt="about"
                className="image-border-img"
              />
            </div>
          </div>
          <div className="basis-full md:basis-1/2 mt-10 md:mt-0">
            <h2 className="Titr mt-0">About Us</h2>
            <p>
              Welcome to Electro Shop , your one-stop destination for the latest
              in laptops, computers, mobile devices, and tech accessories. We
              are passionate about technology and committed to providing our
              customers with top-quality products and exceptional service.
            </p>
            <p className="my-5">
              At Electro Shop, we believe in the power of technology to
              transform lives. Founded by tech enthusiasts, our mission is to
              bring the best and most reliable gadgets to our customers at
              competitive prices. Whether you're a professional, a student, a
              gamer, or someone looking to stay connected with the world, we
              have something for everyone.
            </p>
            {currentPath === "/about" ? (
              <>
                <div className="row">
                  <div className="basis-1/2 flex items-center">
                    <FaCheckCircle className="text-secondary" />
                    <p className="pl-2">What We Offer</p>
                  </div>
                  <div className="basis-1/2 flex items-center">
                    <FaCheckCircle className="text-secondary" />
                    <p className="pl-2">Our Commitment</p>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="basis-1/2 flex items-center">
                    <FaCheckCircle className="text-secondary" />
                    <p className="pl-2">Our Vision</p>
                  </div>
                  <div className="basis-1/2 flex items-center">
                    <FaCheckCircle className="text-secondary" />
                    <p className="pl-2">Why Choose Us?</p>
                  </div>
                </div>
              </>
            ) : null}

            <Link
              className={currentPath === "/about" ? "hidden" : "read-more mt-6"}
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
