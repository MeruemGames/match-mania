// src/global.d.ts
export { };

declare global {
  interface Window {
    Poki?: {
      init: () => Promise<void>;
      gameplayStart: () => void;
      gameplayStop: () => void;
      rewardedBreak: () => Promise<void>;
    };
  }
}
