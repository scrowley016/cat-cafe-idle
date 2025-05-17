import React from "react";
import "./CatVisual.css";

const CafeVisual = ({ cats, upgrades, background }) => {
  const ownedUpgrades = upgrades.filter((u) => u.count > 0);

  return (
    <div className="cafe-visual">
      <img src={background} alt="Cafe Background" className="cafe-bg" />

      {cats.map((cat, index) => {
        const baseTop = window.innerWidth < 500 ? 280 : 320;
        const baseLeft = window.innerWidth < 500 ? 50 : 250;
        const spacingX = window.innerWidth < 500 ? 50 : 80;
        const spacingY = 50;
        const columns = 5;
        const row = Math.floor(index / columns);
        const col = index % columns;
        const jitterX = Math.floor(Math.random() * 20) - 10;
        const jitterY = Math.floor(Math.random() * 10) - 5;

        return (
          <img
            key={index}
            src={cat.image}
            alt={cat.name}
            className="cat"
            style={{
              top: `${baseTop + row * spacingY + jitterY}px`,
              left: `${baseLeft + col * spacingX + jitterX}px`,
              height: window.innerWidth < 500 ? "10%" : "15%",
              transform: `rotate(${cat.angle || 0}deg)`,
              transition: "transform 0.5s",
              zIndex: cat.zIndex || 2,
              filter: cat.isSleeping ? "grayscale(100%)" : "none",
              opacity: cat.isSleeping ? 0.5 : 1,
              cursor: cat.isSleeping ? "not-allowed" : "pointer",
              pointerEvents: cat.isSleeping ? "none" : "auto",
              position: "absolute",
              animation: `${cat.rare ? "bounce sparkle" : "bounce"} 2s infinite ease-in-out`
            }}
          />
        );
      })}

      {ownedUpgrades
        .filter((up) => !up.name.toLowerCase().includes("new café"))
        .flatMap((up) =>
          Array.from({ length: up.count }, (_, i) => {
            const name = up.name.toLowerCase();
            let style = {
              position: "absolute",
              zIndex: 1,
              transition: "transform 0.5s ease-in-out",
            };

            const idx = i;

            if (name.includes("laser")) {
              style.top = idx % 2 === 0 ? "10px" : "10px";
              style.left = idx % 2 === 0 ? "10px" : "calc(100% - 80px)";
              style.transform = "rotate(100deg)";
              style.height = "10%";
              style.animation = "sway 1.5s infinite ease-in-out";
            } else if (name.includes("bed") || name.includes("lounger")) {
              style.bottom = `${10 + idx * 30}px`;
              style.right = `${20 + (idx % 2) * 100}px`;
              style.height = "20%";
              style.transform = style.transform || "none";
            } else if (name.includes("deluxe") || name.includes("tree")) {
              style.bottom = `${20 + idx * 20}px`;
              style.left = `${20 + (idx % 3) * 100}px`;
              style.height = "30%";
              style.transform = style.transform || "none";
            } else if (name.includes("tower")) {
              style.bottom = `${20 + idx * 20}px`;
              style.right = `${20 + (idx % 3) * 100}px`;
              style.height = "15%";
              style.transform = style.transform || "none";
            } else if (name.includes("feeder") || name.includes("treat") || name.includes("food")) {
              style.bottom = `${40 + idx * 20}px`;
              style.left = `${200 + (idx % 3) * 60}px`;
              style.height = "10%";
              style.animation = "shake 3s infinite ease-in-out";
              style.transform = style.transform || "none";
            } else {
              style.bottom = `${10 + idx * 30}px`;
              style.left = `${10 + (idx % 4) * 80}px`;
              style.height = "20%";
              style.transform = style.transform || "none";
            }

            if (name.includes("deluxe") || name.includes("tree")) {
              style.height = "28%";
            }
            if (name.includes("food") || name.includes("feeder")) {
              style.height = "14%";
            }

            return (
              <img
                key={`${up.id}-${i}`}
                src={up.image}
                alt={up.name}
                className="upgrade-item"
                style={style}
              />
            );
          })
        )}
    </div>
  );
};

export default CafeVisual;
