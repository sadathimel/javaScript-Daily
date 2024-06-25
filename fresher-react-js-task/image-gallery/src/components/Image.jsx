import React from "react";
import "../App.css"; 

function Image({ src, alt, selected, onSelect }) {
  return (
    
      <div className={(`image ${selected ? "selected" : ""}`, "imgsize")}>

      <button onClick={onSelect}>
        <img src={src} alt={alt} />
      </button>
      
    </div>
  );
}

export default Image;
