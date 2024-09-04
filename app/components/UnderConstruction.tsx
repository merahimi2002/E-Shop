import Image from "next/image";
import image from "@/public/image/construction.png";

const UnderConstruction = () => {
  return (
    <section>
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="flex flex-col justify-center">
            <h2 className="text-6xl text-primary font-medium mb-5">
              Website is under{" "}
            </h2>
            <h2 className="text-6xl text-primary font-medium">Construction</h2>
          </div>
          <Image
            src={image}
            alt="Logo"
            priority
            className="mt-5"
            style={{ objectFit: "contain", width: "100%", height: "80vh" }}
          />
        </div>
      </div>
    </section>
  );
};

export default UnderConstruction;
