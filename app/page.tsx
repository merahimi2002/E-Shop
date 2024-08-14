import CarouselSlider from "./components/CarouselSlider";
import Slider from "@/public/image/Slider01.png";

export default function Home() {
  return (
    <>
      <div className="bg-gradient-to-b from-white to-primary pt-10">
        <CarouselSlider images={[Slider, Slider, Slider]} />
      </div>
    </>
  );
}
