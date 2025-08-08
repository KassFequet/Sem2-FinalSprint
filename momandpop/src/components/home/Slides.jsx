import { Link } from "react-router-dom";
import "../home/Home.css";
import slide1 from "../../images/Home/slideshow1.jpg";
import slide2 from "../../images/Home/slideshow2.jpg";
import slide3 from "../../images/Home/slideshow3.jpg";
import slide4 from "../../images/Home/slideshow4.jpg";
import slide5 from "../../images/Home/slideshow5.jpg";

export const slideData = [
  {
    id: 1,
    name: "Timber",
    image: slide1,
    description:
      "Tough enough for your biggest projects, beautiful enough for your finest work",
    link: "/placeholder/1",
  },
  {
    id: 2,
    name: "Wood Working Tools",
    image: slide2,
    description: "Precision tools for makers who turn wood into art",
    link: "/placeholder/2",
  },
  {
    id: 3,
    name: "Paints & Stains",
    image: slide3,
    description: "The final touch that makes your craft unforgettable",
    link: "/placeholder/3",
  },
  {
    id: 4,
    name: "Gardening Tools",
    image: slide4,
    description: "Built for hands that grow beauty from the ground up",
    link: "/placeholder/4",
  },
  {
    id: 5,
    name: "Seeds",
    image: slide5,
    description:
      "Vibrant blooms & bountiful harvests start with the right seeds",
    link: "/placeholder/5",
  },
];


function Slide({ slidePage }) {
  const product = slideData[slidePage];
  return (
    <div className="slide"  style={{ backgroundImage: `url(${product.image})` }}>
      <div className="slideContent">
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <Link to={product.link}>
          <button>Show Now</button>
        </Link>
      </div>
    </div>
  );
}

export default Slide;
