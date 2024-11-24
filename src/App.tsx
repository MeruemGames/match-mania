import React, { useEffect } from 'react';
import LevelManager from './components/LevelManager';
import './styles/App.css'
import './styles/Game.css'

const App: React.FC = () => {
  useEffect(() => {
    if (window.Poki) {
      window.Poki.init().then(() => {
        console.log("Poki SDK initialized successfully!");
      }).catch((err) => {
        console.error("Poki SDK failed to initialize:", err);
      });
    }
  }, []);

  return (
    <div className="App">
      <h1>Match Mania</h1>
      <LevelManager />
    </div>
  );
};

export default App;
