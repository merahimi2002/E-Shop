import { BsFillEnvelopeAtFill } from "react-icons/bs";
import { MdDoubleArrow } from "react-icons/md";
import { FaPhoneVolume } from "react-icons/fa6";
import { IoLogoYoutube, IoLogoWhatsapp } from "react-icons/io";
import { RiInstagramFill } from "react-icons/ri";
import { FaTelegram } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/image/Logo.png";

const Footer = () => {
  return (
    <section className="relative bg-gradient-to-b from-base-100 to-primary mb-0 mt-20 pt-20 pb-10 before:opacity-30 before:absolute before:top-0 before:left-0 before:w-full before:h-full  before:bg-[url('https://res.cloudinary.com/eshop-project/image/upload/v1725523619/BG-Footer_k2c6nv.png')] bg-no-repeat bg-cover bg-left">
      <div className="container relative">
        <div className="grid grid-cols-1 md:grid-cols-7">
          <div className="md:col-span-3 my-5">
            <Link href="/">
              <Image
                src={Logo}
                alt="Logo"
                priority
                className="w-1/2 md:w-2/3 lg:w-2/5"
              />
            </Link>
            <p className="text-white text-lg w-full lg:w-1/2 md:w-3/4 leading-7 mt-5">
              At{" "}
              <span className="text-secondary font-semibold">Electro Shop</span>
              , we believe in the power of technology to transform lives
            </p>
          </div>
          <div className="md:col-span-2 my-5">
            <h2 className="text-2xl font-semibold text-white">
              Useful <span className="text-secondary">Links</span>
            </h2>
            <ul className="p-0">
              <li className="flex items-center leading-10 text-lg text-white translate-hover-x w-fit">
                <MdDoubleArrow className="text-secondary text-3xl pr-3" />
                <Link href="/">Home</Link>
              </li>
              <li className="flex items-center leading-10 text-lg text-white translate-hover-x w-fit">
                <MdDoubleArrow className="text-secondary text-3xl pr-3" />
                <Link href="/about">About</Link>
              </li>
              <li className="flex items-center leading-10 text-lg text-white translate-hover-x w-fit">
                <MdDoubleArrow className="text-secondary text-3xl pr-3" />
                <Link href="/contact">Contact</Link>
              </li>
              <li className="flex items-center leading-10 text-lg text-white translate-hover-x w-fit">
                <MdDoubleArrow className="text-secondary text-3xl pr-3" />
                <Link href="/product">Product</Link>
              </li>
            </ul>
          </div>
          <div className="md:col-span-2 my-5">
            <h2 className="text-2xl font-semibold text-white">
              Contact <span className="text-secondary">info</span>
            </h2>
            <ul className="p-0">
              <li className="flex items-center leading-10 text-lg text-white translate-hover-x w-fit">
                <FaPhoneVolume className="text-secondary text-3xl pr-3" />
                <a href="tel:+9810123456789">012-345-6789</a>
              </li>
              <li className="flex items-center leading-10 text-lg text-white translate-hover-x w-fit">
                <FaPhoneVolume className="text-secondary text-3xl pr-3" />
                <a href="tel:+9810123456789">012-345-6789</a>
              </li>
              <li className="flex items-center leading-10 text-lg text-white translate-hover-x w-fit">
                <BsFillEnvelopeAtFill className="text-secondary text-3xl pr-3" />
                <a href="mailto:info@electroshop.com">info@electroshop.com</a>
              </li>
            </ul>
            <div className="flex gap-4 mt-8">
              <div className="p-2 rounded-md translate-hover bg-white text-[#bc1888] hover:bg-[#bc1888] hover:text-white">
                <RiInstagramFill className="text-2xl " />
              </div>
              <div className="p-2 rounded-md translate-hover bg-white text-[#FF0000] hover:bg-[#FF0000] hover:text-white">
                <IoLogoYoutube className="text-2xl " />
              </div>
              <div className="p-2 rounded-md translate-hover bg-white text-[#25D366] hover:bg-[#25D366] hover:text-white">
                <IoLogoWhatsapp className="text-2xl " />
              </div>
              <div className="p-2 rounded-md translate-hover bg-white text-[#0088cc] hover:bg-[#0088cc] hover:text-white">
                <FaTelegram className="text-2xl " />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
