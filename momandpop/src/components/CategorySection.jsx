import {useState} from "react";
import Dropdown from "./Dropdown";
import "../Catalogue.css";

export default function CategorySection ({title, backgroundImage, menuItems}) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="categorysection"
        onMouseEnter = {() => setIsOpen(true)}
        onMouseLeave = {() => setIsOpen(false)}
        style={{ backgroundImage: `url(${backgroundImage})` }}>

            <h3>{title}</h3>
            {isOpen && <Dropdown items = {menuItems} />}
        </div>
    )
};
