import { useState, useEffect } from "react";
import Slide from "../components/home/Slides";
import slideData from "../data/SlideData";
import "../components/home/Home.css";
import mompopgradient from "../images/Home/mompopgradient.png";

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
              <img src={mompopgradient} alt="Mom and Pop" />
          </div>
    </>
  );
}

export default Home;
