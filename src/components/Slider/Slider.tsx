import React, { FC, useEffect, useRef, useState } from 'react';

import './Slider.scss';

const Slider: FC = () => {
  const blockRef = useRef<HTMLDivElement>(null);
  const [x, setX] = useState(0);
  const [xStart, setXStart] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', mouseMove);
      document.addEventListener('mouseup', mouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', mouseMove);
      document.removeEventListener('mouseup', mouseUp);
    };
  }, [isDragging]);

  useEffect(() => {
    if (blockRef.current) {
      setXStart(blockRef.current.getBoundingClientRect().x)
    }
  }, [blockRef]);

  const mouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    if (e.pageX < xStart + 15 || e.pageX > xStart + 200 - 7.5) return;
    setX(x => x + e.movementX);
  };

  const mouseUp = (e: MouseEvent) => {
    setIsDragging(false);
  };

  const mouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
  };

  return (
    <div className='wrapper'>
      <div className='line' ref={blockRef} />
      <div
        className='block'
        onMouseDown={mouseDown}
        style={{ left: `${x}px` }} />
    </div>
  );
};

export default Slider;