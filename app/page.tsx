import CarouselSlider from "./components/CarouselSlider";

export default function Home() {
  const Sliders = [
    "https://res.cloudinary.com/eshop-project/image/upload/v1723718226/Slider01_emc4be.png",
    "https://res.cloudinary.com/eshop-project/image/upload/v1723718225/Slider02_eu3baz.png"
  ];
  return (
    <>
      <div className="bg-gradient-to-b from-base-100 to-primary pt-10">
        <CarouselSlider images={Sliders} />
      </div>
    </>
  );
}
