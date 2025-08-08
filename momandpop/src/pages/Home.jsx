import { useState, useEffect } from "react";
import slideData from "../data/SlideData";
import Slide from "../components/home/Slides";
import "../components/home/Home.css";

function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = slideData.length;


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000);

    return () => clearInterval(interval);
  }, [totalSlides]);

  return (
    <>
      <div className="slideContainer">
        {slideData.map((slide, index) =>
          index === currentSlide ? (
            <Slide key={index} slidePage={index} />
          ) : null
        )}
          </div>

          <div className="momAndPop">
              <img src="/images/Home/mompopgradient.png" alt="Mom and Pop" />
          </div>
    </>
  );
}

export default Home;
