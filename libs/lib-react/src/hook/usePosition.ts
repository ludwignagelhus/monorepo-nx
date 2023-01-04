import React, { useLayoutEffect, useRef, useState } from "react";

/* Does this even work properly? */

export type Position = {
  x: number;
  y: number;
};

type TUsePosition = () => {
  center: Position;
  ref: React.MutableRefObject<any>;
  topLeft: Position;
};

export const origin: Position = { x: 0, y: 0 };

export const usePositions: TUsePosition = () => {
  const ref = useRef<HTMLElement>();
  const [rect, setRect] = useState<DOMRect>();

  useLayoutEffect(() => {
    if (!ref.current) return;
    setRect(ref.current.getBoundingClientRect());
  }, [ref.current]);

  return {
    ref,
    topLeft: rect ? { x: rect.x, y: rect.y } : origin,
    center: rect
      ? {
          x: rect.x + rect.width / 2,
          y: rect.y + rect.height / 2,
        }
      : origin,
  };
};
