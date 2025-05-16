import React from "react";
import "./CatVisual.css";

const CafeVisual = ({ cats, upgrades }) => {
  const ownedUpgrades = upgrades.filter((u) => u.count > 0);

  return (
    <div className="cafe-visual">
        <img
          src="/images/cafe-background.jpg"
          alt="Cafe Background"
          className="cafe-bg"
        />

      {cats.map((cat, index) => (
        <img
          key={index}
          src={cat.image}
          alt={cat.name}
          className="cat"
          style={{
            top: `${20 + index * 40}px`,
            left: `${30 + (index % 3) * 60}px`,
          }}
        />
      ))}

      {ownedUpgrades.map((up, idx) => (
        <img
          key={up.id}
          src={`/images/upgrades/${up.name
            .replaceAll(" ", "-")
            .toLowerCase()}.png`}
          alt={up.name}
          className="upgrade-item"
          style={{
            bottom: `${10 + idx * 30}px`,
            left: `${10 + (idx % 4) * 80}px`,
          }}
        />
      ))}
    </div>
  );
};

export default CafeVisual;
