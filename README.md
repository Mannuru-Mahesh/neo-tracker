# 🌍 NEO Tracker — Live Asteroid Orbital Monitor

> An interactive 3D Earth globe that maps real NASA Near Earth Objects in orbit — built with Three.js and live NASA API data.

**🔗 Live Site → [https://mannuru-mahesh.github.io/neo-tracker/](https://mannuru-mahesh.github.io/neo-tracker/)**

---

![NEO Tracker Preview](https://raw.githubusercontent.com/Mannuru-Mahesh/neo-tracker/main/src/assets/hero.png)

---

## ✨ Features

- 🌐 **Photorealistic 3D Earth** — High-res NASA textures with animated cloud layer and atmospheric glow
- ☄️ **Live NASA NEO Data** — Fetches today's real Near Earth Objects from the [NASA NEO API](https://api.nasa.gov/) every time you load the app
- 🔴 **Hazard Classification** — Red asteroids are flagged as *Potentially Hazardous* by NASA, green ones are on safe trajectories
- 📡 **Telemetry Sidebar** — Click any asteroid to instantly see its velocity, estimated diameter, and miss distance from Earth
- 🎯 **Easy Clicking** — Each asteroid has an invisible enlarged hit zone so you can easily select them even while they're moving
- ⏸️ **Hover to Pause** — Asteroids pause their orbit when you hover over them so you never lose track
- 💥 **Bloom Post-Processing** — Cinematic glow effects powered by `@react-three/postprocessing`
- ⭐ **Animated Star Field** — 5,000 stars with depth and fade effects fill the space environment

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) | UI & type safety |
| [Three.js](https://threejs.org/) | 3D rendering engine |
| [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber) | React renderer for Three.js |
| [@react-three/drei](https://github.com/pmndrs/drei) | Three.js helpers (Stars, OrbitControls, Html) |
| [@react-three/postprocessing](https://github.com/pmndrs/react-postprocessing) | Bloom & post-processing effects |
| [NASA NEO API](https://api.nasa.gov/) | Live asteroid data |
| [Vite](https://vite.dev/) | Build tool & dev server |
| [GitHub Pages](https://pages.github.com/) | Free hosting & CI/CD via GitHub Actions |

---

## 🚀 Run Locally

```bash
git clone https://github.com/Mannuru-Mahesh/neo-tracker.git
cd neo-tracker
npm install
npm run dev
```

Then open **[http://localhost:5173/](http://localhost:5173/)** in your browser.

---

## 🎮 Controls

| Action | Result |
|---|---|
| **Click + Drag** | Rotate the globe |
| **Scroll** | Zoom in / out |
| **Hover** asteroid | Pauses its orbit |
| **Click** asteroid | Shows telemetry in sidebar |

---

## 📡 Data Source

All asteroid data is fetched live from the **NASA Near Earth Object Web Service (NeoWs)**:

```
https://api.nasa.gov/neo/rest/v1/feed?start_date=TODAY&api_key=DEMO_KEY
```

Each session loads **real objects** tracked by NASA for the current date — including their actual velocity, estimated size, miss distance, and hazard classification.

> The orbital positions around the globe are a stylized artistic representation. The telemetry data (velocity, diameter, miss distance, hazard status) is 100% real NASA data.

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Earth.tsx          # Photorealistic Earth with textures & clouds
│   ├── AsteroidField.tsx  # Interactive orbiting asteroid markers
│   └── Sidebar.tsx        # Glassmorphism telemetry panel
├── hooks/
│   └── useNeoData.ts      # NASA API fetch hook with fallback
├── types.ts               # TypeScript interfaces
├── App.tsx                # Scene composition
└── index.css              # Global styles & design tokens
```

---

## 📜 License

MIT — free to use, fork, and build upon.

---

<p align="center">Made with ☄️ and Three.js</p>
