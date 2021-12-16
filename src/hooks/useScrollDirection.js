import { useState, useEffect } from 'react';

const SCROLL_UP = 'up';
const SCROLL_DOWN = 'down';

const useScrollDirection = ({ direction, thresholdpx, off } = {}) => {
  const [scrollDirection, setScrollDirection] = useState(direction);

  useEffect(() => {
    const threshold = thresholdpx || 0;
    let lastScrollY = window.pageYOffset;
    let ticking = false;

    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset;

      if (Math.abs(scrollY - lastScrollY) < threshold) {
        ticking = false;
        return;
      }

      setScrollDirection(scrollY > lastScrollY ? SCROLL_DOWN : SCROLL_UP);
      lastScrollY = scrollY > 0 ? scrollY : 0;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDirection);
        ticking = true;
      }
    };

    !off ? window.addEventListener('scroll', onScroll) : setScrollDirection(direction);

    return () => window.removeEventListener('scroll', onScroll);
  }, [direction, thresholdpx, off]);

  return scrollDirection;
};

export default useScrollDirection;
