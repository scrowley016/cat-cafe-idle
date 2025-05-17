import React from "react";
import "./CatVisual.css";

const CafeVisual = ({ cats, upgrades, background }) => {
  const ownedUpgrades = upgrades.filter((u) => u.count > 0);

  return (
    <div className="cafe-visual">
        <img
          src={background}
          alt="Cafe Background"
          className="cafe-bg"
        />

      {ownedUpgrades.map((up, idx) => (
        <img
          key={up.id}
          src={`/images/${up.name
            .replaceAll(" ", "-")
            .toLowerCase()}.png`}
          alt={up.name}
          className="upgrade-item"
          style={{
            bottom: `${10 + idx * 30}px`,
            left: `${10 + (idx % 4) * 80}px`,
            height: "20%",
          }}
        />
      ))}

      {cats.map((cat, index) => (
        <img
          key={index}
          src={cat.image}
          alt={cat.name}
          className="cat"
          style={{
            top: `${20 + index * 40}px`,
            left: `${30 + (index % 3) * 60}px`,
            height: "20%",
            transform: `rotate(${cat.angle}deg)`,
            transition: "transform 0.5s",
            zIndex: cat.zIndex, 
            filter: cat.isSleeping ? "grayscale(100%)" : "none",
            opacity: cat.isSleeping ? 0.5 : 1,
            cursor: cat.isSleeping ? "not-allowed" : "pointer",
            pointerEvents: cat.isSleeping ? "none" : "auto",
            
          }}
        />
      ))}
    </div>
  );
};

export default CafeVisual;
