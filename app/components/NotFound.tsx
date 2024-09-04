import image from "@/public/image/404.png";
import Image from "next/image";

const NotFound = ({ message }: { message: string }) => {
  return (
    <section>
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="flex flex-col flex-center">
            <h2 className="text-9xl text-primary font-semibold">404</h2>
            <p className="text-4xl text-primary font-medium mt-5">
             {message}
            </p>
          </div>
          <Image
            src={image}
            alt="Logo"
            priority
            className="mt-5"
            style={{ objectFit: "contain", width: "100%", height: "70vh" }}
          />
        </div>
      </div>
    </section>
  );
};

export default NotFound;
