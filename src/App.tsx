import React, { useEffect } from 'react';
import LevelManager from './components/LevelManager';
import './styles/App.css'
import './styles/Game.css'

const App: React.FC = () => {
  useEffect(() => {
    const loadPokiSDK = async () => {
      console.log("useeffect app", window.Poki);

      if (!window.Poki) {
        console.log("Loading Poki SDK script");
        const script = document.createElement("script");
        script.src = "https://game-cdn.poki.com/scripts/v2/poki-sdk.js";
        script.async = true;

        script.onload = () => {
          console.log("Poki SDK script loaded");

          const intervalId = setInterval(() => {
            if (window.Poki) {
              clearInterval(intervalId);
              window.Poki.init()
                .then(() => console.log("Poki SDK initialized successfully!"))
                .catch((err) => console.error("Poki SDK failed to initialize:", err));
            }
          }, 200);

          setTimeout(() => clearInterval(intervalId), 3000);  // Stop after 3 seconds
        };


        script.onerror = () => console.error("Failed to load Poki SDK script");
        document.body.appendChild(script);
      } else if (window.Poki) {
        console.log("useeffect app2");
        window.Poki.init()
          .then(() => console.log("Poki SDK initialized successfully!"))
          .catch((err) => console.error("Poki SDK failed to initialize:", err));
      }
    };


    loadPokiSDK();
  }, []);



  return (
    <div className="App">
      <h1>Match Mania</h1>
      <LevelManager />
    </div>
  );
};

export default App;
