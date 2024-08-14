import CarouselSlider from "./components/CarouselSlider";
import Slider from "@/public/image/Slider01.png";

export default function Home() {
  return (
    <>
      <CarouselSlider images={[Slider, Slider, Slider]} />
    </>
  );
}
