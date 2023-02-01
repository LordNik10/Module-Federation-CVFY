import { useState, useEffect } from 'react';

interface IScreen {
  width: number;
  height: number;
}

export const useScreen = () => {
  const [screen, setScreen] = useState<IScreen>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    function updateScreen() {
      setScreen((prevScreen) => ({
        ...prevScreen,
        width: window.innerWidth,
        height: window.innerHeight,
      }));
    }
    window.addEventListener('resize', updateScreen);

    return () => {
      window.removeEventListener('resize', updateScreen);
    };
  }, []);

  return screen;
};
