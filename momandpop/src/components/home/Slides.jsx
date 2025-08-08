import React from "react";
import { Link } from "react-router-dom";
import "../../Home.css";
import slideData from "../../data/SlideData"


function Slide({ slidePage }) {
  const product = slideData[slidePage];
  return (
    <div className="slide"  style={{ backgroundImage: `url(${product.image})` }}>
      <div className="slideContent">
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <Link to={product.link}>
          <button>Shop Now</button>
        </Link>
      </div>
    </div>
  );
}

export default Slide;
