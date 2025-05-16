import { useEffect, useState } from "react";
import "./App.css";
import confetti from 'canvas-confetti';
import CafeVisual from "./CatVisual";

function App() {
    const initialUpgrades = [
      { id: 1, name: "Cat Tower", baseCost: 50, cps: 1, count: 0 },
      { id: 2, name: "Fancy Treats", baseCost: 150, cps: 3, count: 0 },
      { id: 3, name: "Laser Pointer", baseCost: 400, cps: 7, count: 0 },
      { id: 4, name: "Deluxe Cat Tree", baseCost: 900, cps: 15, count: 0 },
      { id: 5, name: "Sunbeam Lounger", baseCost: 2500, cps: 35, count: 0 },
      { id: 6, name: "Automated Treat Dispenser", baseCost: 7000, cps: 90, count: 0 },
      { id: 7, name: "New Café Location", baseCost: 45000, cps: 280, count: 0 }
    ];
  
    const maxCatsPerCafe = 20;
    const maxUpgradesPerCafe = 25;

    const [upgrades, setUpgrades] = useState(() => {
      const saved = localStorage.getItem("upgrades");
      return saved ? JSON.parse(saved) : initialUpgrades;
    });
  
  const [floaters, setFloaters] = useState([]);

  const [cafes, setCafes] = useState([
    {
      id: 1,
      name: "Main Street Café",
      background: "/images/cafe-background.jpg",
      cats: [],
      upgrades: [],
    },
  ]);

  const [coins, setCoins] = useState(() => {
    return parseInt(localStorage.getItem("coins")) || 0;
  });

  const [coinsPerClick, setCoinsPerClick] = useState(1);

  const [coinsPerSecond, setCoinsPerSecond] = useState(() => {
    return parseInt(localStorage.getItem("cps")) || 0;
  });

  const [cats, setCats] = useState(() => {
    return parseInt(localStorage.getItem("cats")) || 0;
  });

  const [showCats, setShowCats] = useState(false);

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
    "https://placekitten.com/80/80?image=1",
    "https://placekitten.com/80/80?image=2",
    "https://placekitten.com/80/80?image=3",
    "https://placekitten.com/80/80?image=4",
    "https://placekitten.com/80/80?image=5",
    "https://placekitten.com/80/80?image=6"
  ];

  const rareCats = [
    { name: "Sir Fluffington", image: "https://placekitten.com/80/80?image=7" },
    { name: "Princess Paws", image: "https://placekitten.com/80/80?image=8" },
    { name: "Shadow Meow", image: "https://placekitten.com/80/80?image=9" },
    { name: "Kiki", image: "https://placekitten.com/80/80?image=10" },
    { name: "Norma", image: "https://placekitten.com/80/80?image=11" },
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

  // Add to state
  const [discount, setDiscount] = useState(0);

  const [catRoster, setCatRoster] = useState(() => {
    const saved = localStorage.getItem("catRoster");
    return saved ? JSON.parse(saved) : [];
  });

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
    if (coins >= cost) {
      setCoins(coins - cost);
      setCats(cats + 1);
      setCoinsPerSecond((prev) => prev + 1);

      // Add cat to roster, with rare cat chance!
      let newCat;
      if (Math.random() < 0.1) {
        // 10% chance to hire a rare cat
        const rare = rareCats[Math.floor(Math.random() * rareCats.length)];
        const effect = rareEffects[Math.floor(Math.random() * rareEffects.length)];
        effect.apply();
        newCat = { ...rare, rare: true, effect: effect.label };
      } else {
        newCat = {
          name: catNames[Math.floor(Math.random() * catNames.length)],
          image: catImages[Math.floor(Math.random() * catImages.length)],
          rare: false
        };
      }
      setCatRoster(prev => [...prev, newCat]);

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  // Modify buyUpgrade to apply discount
  const buyUpgrade = (upgradeId) => {
    setUpgrades((prev) =>
      prev.map((up) => {
        if (up.id === upgradeId) {
          const cost = Math.floor(up.baseCost * Math.pow(1.3, up.count) * (1 - discount));
          if (coins >= cost) {
            setCoins(coins - cost);
            setCoinsPerSecond((cps) => cps + up.cps);
            setDiscount(0); // Reset discount after use
            return { ...up, count: up.count + 1 };
          }
        }
        return up;
      })
    );
  };

  useEffect(() => {
    localStorage.setItem("coins", coins);
    localStorage.setItem("cats", cats);
    localStorage.setItem("cps", coinsPerSecond);
    localStorage.setItem("upgrades", JSON.stringify(upgrades));
  }, [coins, cats, coinsPerSecond, upgrades]);

  useEffect(() => {
    localStorage.setItem("catRoster", JSON.stringify(catRoster));
  }, [catRoster]);

  return (
    <div className="game-container">
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
            {[...upgrades].map((up) => {
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
          <CafeVisual cats={catRoster} upgrades={upgrades} />
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
              {catRoster.map((cat, i) => (
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
