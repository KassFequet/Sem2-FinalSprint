import {sections} from "../data/productData";
import CategorySection from "../components/CategorySection";
import "../Catalogue.css";

export default function Catalogue() {
  return (
    <div className="cataloguepage">
      {sections.map((section, index) => (
        <CategorySection
          key={index}
          title={section.title}
          backgroundImage={section.backgroundImage}
          menuItems={section.menuItems}
        />
      ))}
    </div>
  );
}
