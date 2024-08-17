import CarouselSlider from "./components/CarouselSlider";

export default function Home() {
  const Sliders = [
    "https://res.cloudinary.com/eshop-project/image/upload/v1723888766/Slider01_zf1web.png",
    "https://res.cloudinary.com/eshop-project/image/upload/v1723888316/Slider02_jy8g1m.png",
    "https://res.cloudinary.com/eshop-project/image/upload/v1723887849/Slider03_rudzvp.png"
  ];
  return (
    <>
      <div className="bg-gradient-to-b from-base-100 to-primary pt-10">
        <CarouselSlider images={Sliders} />
      </div>
    </>
  );
}
