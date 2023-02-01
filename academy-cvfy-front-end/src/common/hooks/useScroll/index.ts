import React, { useEffect, useState } from 'react';

interface IScrollY {
  value: number;
  isScrollDown: boolean | null;
}

interface IScrollX {
  value: number;
  isScrollRight: boolean | null;
}

export const useScroll = (targetScroll: React.RefObject<HTMLDivElement>) => {
  const [scrollY, setScrollY] = useState<IScrollY>({
    value: NaN,
    isScrollDown: null,
  });
  const [scrollX, setScrollX] = useState<IScrollX>({
    value: NaN,
    isScrollRight: null,
  });

  useEffect((): any => {
    if (!targetScroll.current) {
      return {};
    }

    const targetScrollValue = targetScroll.current;

    function updateScroll() {
      if (scrollY?.value < targetScrollValue?.scrollTop) {
        setScrollY((prevScrollY) => ({ ...prevScrollY, isScrollDown: true }));
      } else {
        setScrollY((prevScrollY) => ({
          ...prevScrollY,
          isScrollDown: false,
        }));
      }

      if (scrollX.value < targetScrollValue.scrollLeft) {
        setScrollX((prevScrollX) => ({ ...prevScrollX, isScrollRight: true }));
      } else {
        setScrollX((prevScrollX) => ({ ...prevScrollX, isScrollRight: false }));
      }

      setScrollY((prevScrollY) => ({
        ...prevScrollY,
        value: targetScrollValue.scrollTop,
      }));

      setScrollX((prevScrollX) => ({
        ...prevScrollX,
        value: targetScrollValue.scrollLeft,
      }));
    }

    targetScrollValue.addEventListener('scroll', updateScroll);

    return () => {
      targetScrollValue.removeEventListener('scroll', updateScroll);
    };
  }, [scrollY.value, scrollX.value, targetScroll]);

  return { scrollY, scrollX };
};
