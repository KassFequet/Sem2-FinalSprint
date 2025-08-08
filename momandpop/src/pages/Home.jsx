import { useState, useEffect } from "react";
import Slide from "../components/home/Slides";
import slideData from "../data/SlideData";
import "../Home.css";
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

      <div className="momAndPop" >
        <img src={mompopgradient} alt="Mom and Pop" />

        <div className="momPopDesc">
          <div>
            Long before it had a name, Mom’s Garden & Pop’s Workshop was simply
            how weekends looked in our family. Mom would be out in her garden,
            surrounded by the luscious plants she lovingly grew, while Pop
            worked away in his shed, turning wood into hand-crafted treasures.
          </div>
          <br />
          <div>
            As the years passed their shared passions `blossomed into a business
            rooted in love and creativity. What began as a weekend pastime is
            now a small family shop that offers everything you need to find the
            same spark of joy in handmade and homegrown goods that first
            inspired them.
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
