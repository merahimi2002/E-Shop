import { About } from "./pages/about/about";
import CarouselSlider from "./components/CarouselSlider";
import Category from "./pages/Category";

export default function Home() {
  const Sliders = [
    "https://res.cloudinary.com/eshop-project/image/upload/v1730134134/Banner01_blrlrh.png",
    "https://res.cloudinary.com/eshop-project/image/upload/v1730134517/Banner02_msgfm1.png",
    "https://res.cloudinary.com/eshop-project/image/upload/v1730134616/Banner03_uc4dib.png",
  ];
  return (
    <>
      <div className="bg-gradient-to-b from-base-100 to-primary pt-10">
        <CarouselSlider images={Sliders} />
      </div>
      <About />
      <Category />
    </>
  );
}
