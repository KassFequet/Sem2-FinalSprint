import React from "react";

export default function Dropdown({items}) {
  return (
    <div className="dropdown">
      {items && items.length > 0 ? (
        items.map((item, idx) => <div className="dropdownitem" key={idx}>{item}</div>)
      ) : (
        <div className="dropdownitem">
          No items available
        </div>
      )}
    </div>
  );        // takes items prop and maps out the items by index
}
