import { useEffect, useState } from "react";
import "./App.css";
import confetti from 'canvas-confetti';
import CafeVisual from "./CatVisual";

function App() {
    const initialUpgrades = [
      { id: 1, name: "Cat Tower", baseCost: 50, cps: 1, count: 0, image: "/images/cat-tower.png" },
      { id: 2, name: "Fancy Treats", baseCost: 150, cps: 3, count: 0, image: "/images/treats.png" },
      { id: 3, name: "Laser Pointer", baseCost: 400, cps: 7, count: 0, image: "/images/laser.png" },
      { id: 4, name: "Deluxe Cat Tree", baseCost: 900, cps: 15, count: 0, image: "/images/deluxe-tree.png" },
      { id: 5, name: "Sunbeam Lounger", baseCost: 2500, cps: 35, count: 0, image: "/images/bed.png" },
      { id: 6, name: "Automated Treat Dispenser", baseCost: 7000, cps: 90, count: 0, image: "/images/feeder.png" },
      { id: 7, name: "New Café Location", baseCost: 45000, cps: 280, count: 0}
    ];
  
    const cafeTemplates = [
      { name: "Main Street Café", background: "/images/cafe-background.jpg" },
      { name: "Beach Café", background: "/images/beach-cafe-background.jpg" },
      { name: "Space Café", background: "/images/space-cafe-background.jpg" },
      { name: "Wizard Café", background: "/images/wizard-cafe-background.jpg" },
      { name: "Planet Café", background: "/images/planet-cafe-background.jpg" },
    ];
    const maxCatsPerCafe = 20;
  
  const [floaters, setFloaters] = useState([]);
  const [coins, setCoins] = useState(() => {
    return parseInt(localStorage.getItem("coins")) || 0;
  });
  const [coinsPerClick] = useState(1);
  const [coinsPerSecond, setCoinsPerSecond] = useState(() => {
    return parseInt(localStorage.getItem("cps")) || 0;
  });
  const [cats, setCats] = useState(() => {
    return parseInt(localStorage.getItem("cats")) || 0;
  });
  const [discount, setDiscount] = useState(0);
  const [showCats, setShowCats] = useState(false);
  const [cafes, setCafes] = useState(() => {
    const saved = localStorage.getItem("cafes");
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 1,
            ...cafeTemplates[0],
            cats: [],
            upgrades: initialUpgrades.map((u) => ({ ...u })),
          },
        ];
  });
  const [currentCafeIndex, setCurrentCafeIndex] = useState(0);

  const catNames = [
    "Mochi", "Snuggles", "Fuzzball", "Buttermilk", "Noodle", "Peanut", "Snickers", "Mittens",
    "Pumpkin", "Tofu", "Luna", "Pickles", "Mochaccino", "Waffles", "Socks", "Maple",
    "Biscuit", "S'mores", "Pudding", "Cinnamon", "Bubbles", "Marshmallow", "Peaches", "Olive",
    "Hazel", "Blueberry", "Clover", "Miso", "Truffle", "Nugget", "Sprout", "Pebbles",
    "Chai", "Oreo", "Mocha", "Butterscotch", "Tater Tot", "Cookie", "Fudge", "Muffin",
    "Pumpkin Pie", "Cheddar", "Velvet", "Poppy", "Fig", "Gingersnap", "Caramel", "Jellybean",
    "Cloud", "Petal", "Churro", "Toast", "Almond", "Cupcake", "Snowball", "Star",
    "Honey", "Cricket", "Raisin", "Scampi", "Gizmo", "Yuzu", "Macaron", "Plum",
    "Fritter", "Pico", "Bean", "Freckles", "Squish", "Cocoa", "Sunshine", "Mango",
    "Dusty", "Freya", "Cloverleaf", "Zelda", "Pixie", "Nova", "Tinsel", "Galaxy",
    "Choco", "Lumi", "Bamboo", "Spice", "Soot", "Ash", "Rolo", "Tapioca",
    "Clementine", "Wiggles", "Goose", "Quill", "Boo", "Shadow", "Sprinkle", "Mallow",
    "Mochi Pop", "Snickerdoodle", "Twinkle", "Blossom", "Flapjack", "Dumpling", "Brûlée", "Twix"
  ];

  const catImages = [
    "/images/cat1.png",
    "/images/cat2.png",
    "/images/cat3.png",
    "/images/cat4.png",
    "/images/cat6.png",
    "/images/cat7.png",
    "/images/cat8.png",
  ];

  const rareCats = [
    { name: "Sir Fluffington", image: "/images/special-cat.png" },
    { name: "Princess Paws", image: "/images/special-cat1.png" },
    { name: "Shadow Meow", image: "/images/special-cat.png" },
    { name: "Kiki", image: "/images/special-cat1.png" },
    { name: "Norma", image: "/images/special-cat.png" },
  ];

  const rareEffects = [
    {
      label: "Generates bonus coins! +50 coins now.",
      apply: () => setCoins((c) => c + 50)
    },
    {
      label: "Boosts morale! +2 CPS.",
      apply: () => setCoinsPerSecond((cps) => cps + 2)
    },
    {
      label: "Negotiates vendor deals! Next upgrade costs 20% less.",
      apply: () => setDiscount(0.2)
    }
  ];

  const currentCafe = cafes[currentCafeIndex];

  const updateCafe = (updatedCafe) => {
    setCafes((prev) =>
      prev.map((cafe, i) => (i === currentCafeIndex ? updatedCafe : cafe))
    );
  };


  useEffect(() => {
    localStorage.setItem("coins", coins);
    localStorage.setItem("cats", cats);
    localStorage.setItem("cps", coinsPerSecond);
  }, [coins, cats, coinsPerSecond]);

const handleClick = (e) => {
  setCoins(coins + coinsPerClick);

  // clickSound.currentTime = 0;
  // clickSound.play();

  const rect = e.target.getBoundingClientRect();
  const x = rect.left + rect.width / 2 + (Math.random() * 40 - 20); // -20 to +20 px offset
  const y = rect.top + (Math.random() * 10 - 5); // slight vertical jitter

  const id = Date.now();
  setFloaters((prev) => [...prev, { id, x, y }]);

  setTimeout(() => {
    setFloaters((prev) => prev.filter((f) => f.id !== id));
  }, 1000);
};

  useEffect(() => {
    const interval = setInterval(() => {
      setCoins((prev) => prev + coinsPerSecond);
    }, 1000);
    return () => clearInterval(interval);
  }, [coinsPerSecond]);

  const hireCat = () => {
    const cost = Math.floor(50 * Math.pow(1.375, cats));
    if (coins >= cost && currentCafe.cats.length < maxCatsPerCafe) {
      setCoins(coins - cost);
      setCats(cats + 1);
      setCoinsPerSecond((prev) => prev + 1);

      let newCat;
      if (Math.random() < 0.1) {
        const rare = rareCats[Math.floor(Math.random() * rareCats.length)];
        const effect =
          rareEffects[Math.floor(Math.random() * rareEffects.length)];
        effect.apply();
        newCat = { ...rare, rare: true, effect: effect.label };
      } else {
        newCat = {
          name: catNames[Math.floor(Math.random() * catNames.length)],
          image: catImages[Math.floor(Math.random() * catImages.length)],
          rare: false,
        };
      }

      const updatedCafe = {
        ...currentCafe,
        cats: [...currentCafe.cats, newCat],
      };
      updateCafe(updatedCafe);

      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    }
  };

  const buyUpgrade = (upgradeId) => {
    const updatedUpgrades = currentCafe.upgrades.map((up) => {
      if (up.id === upgradeId) {
        const cost = Math.floor(
          up.baseCost * Math.pow(1.3, up.count) * (1 - discount)
        );
        if (coins >= cost) {
          setCoins(coins - cost);
          setCoinsPerSecond((cps) => cps + up.cps);
          setDiscount(0);

          // If this is the "New Café Location" upgrade:
          if (
            up.name === "New Café Location" &&
            cafes.length < cafeTemplates.length
          ) {
            const template = cafeTemplates[cafes.length];
            const newCafe = {
              id: cafes.length + 1,
              ...template,
              cats: [],
              upgrades: initialUpgrades.map((u) => ({ ...u })),
            };
            setCafes([...cafes, newCafe]);
            setCurrentCafeIndex(cafes.length);
          }

          return { ...up, count: up.count + 1 }; // Increase upgrade count (makes future purchases more expensive)
        }
      }
      return up;
    });

    const updatedCafe = {
      ...currentCafe,
      upgrades: updatedUpgrades,
    };
    updateCafe(updatedCafe);
  };

  useEffect(() => {
    localStorage.setItem("coins", coins);
    localStorage.setItem("cats", cats);
    localStorage.setItem("cps", coinsPerSecond);
    localStorage.setItem("cafes", JSON.stringify(cafes));
  }, [coins, cats, coinsPerSecond, cafes]);

  return (
    <div className="game-container">
      <div className="cafe-tabs">
        {cafes.map((cafe, i) => (
          <button
            key={cafe.id}
            onClick={() => setCurrentCafeIndex(i)}
            className={currentCafeIndex === i ? "active" : ""}
          >
            {cafe.name}
          </button>
        ))}
      </div>
      <header className="hud">
        <div>💰 Coins: {coins}</div>
        <div>⚡ CPS: {coinsPerSecond}</div>
        <button onClick={handleClick}>☕ Serve Customer</button>
        <button onClick={hireCat}>
          🐱 Hire Cat (Cost: {Math.floor(50 * Math.pow(1.375, cats))})
        </button>
      </header>

      <div className="game-body">
        <aside className="panel upgrades">
          <h3>Upgrades</h3>
          <div className="scroll-area">
            {currentCafe.upgrades.map((up) => {
              const cost = Math.floor(
                up.baseCost * Math.pow(1.3, up.count) * (1 - discount)
              );
              return (
                <div key={up.id} className="upgrade-card">
                  <p>
                    <strong>{up.name}</strong> (x{up.count})
                  </p>
                  <p>
                    +{up.cps} CPS — {cost} coins
                  </p>
                  <button onClick={() => buyUpgrade(up.id)}>Buy</button>
                </div>
              );
            })}
          </div>
        </aside>

        <main className="cafe-area">
          <CafeVisual cats={currentCafe.cats} upgrades={currentCafe.upgrades} background={currentCafe.background} />
        </main>

        {/* Mobile Toggle Button */}
        <div className="mobile-toggle">
          <button onClick={() => setShowCats(!showCats)}>
            {showCats ? "Hide Cats 🐾" : "Show Cats 🐱"}
          </button>
        </div>

        {/* Conditionally render cat roster */}
        {(window.innerWidth >= 768 || showCats) && (
          <aside className="panel cat-roster">
            <h3>My Cats</h3>
            <div className="scroll-area">
              {currentCafe.cats.map((cat, i) => (
                <div key={i} className="cat-card">
                  <img src={cat.image} alt={cat.name} />
                  <p>
                    {cat.name} {cat.rare && "🌟"}
                    <br />
                    <small>{cat.effect}</small>
                  </p>
                </div>
              ))}
            </div>
          </aside>
        )}
      </div>

      {floaters.map((f) => (
        <div
          key={f.id}
          className="floating-coin"
          style={{ left: f.x, top: f.y, position: "fixed" }}
        >
          +${coinsPerClick}
        </div>
      ))}
    </div>
  );
}

export default App;
