import { useState } from "react";
import { sections } from "../data/productData";
import Dropdown from "../components/Dropdown";
import "../Catalogue.css";

export default function Catalogue() {
  const [hoveredCategoryIndex, setHoveredCategoryIndex] = useState(null);

  return (
    <div className="cataloguepage">
      {sections.map((section, index) => (
        <div
          key={index}
          className="category-wrapper"
          style={{ marginBottom: "1rem" }}
          onMouseEnter={() => setHoveredCategoryIndex(index)}
          onMouseLeave={() => setHoveredCategoryIndex(null)}
        >
          {/* Category section */}
          <div
            className="categorysection"
            style={{
              backgroundImage: `linear-gradient(
                to right,
                rgba(80, 48, 31, 0.97) 30%,
                rgba(151, 93, 57, 0.7) 40%,
                rgba(173, 106, 65, 0.35) 70%,
                rgba(202, 124, 76, 0.12) 100%
              ), url(${section.backgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <h2>{section.title}</h2>
          </div>

          {/* Dropdown under category */}
          {hoveredCategoryIndex === index && (
            <div className="dropdowncontainer">
              <Dropdown category={section.category} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
