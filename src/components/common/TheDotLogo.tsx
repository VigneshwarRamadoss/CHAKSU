import React from "react";

interface TheDotLogoProps {
  className?: string;
  size?: number;
  color?: string;
}

export function TheDotLogo({ className, size = 18, color = "currentColor" }: TheDotLogoProps) {
  // Grid definition for The Dot logo diamond pixel art (9x9 grid)
  const gridRows = [
    [4],
    [3, 4, 5],
    [2, 3, 4, 5, 6],
    [1, 2, 3, 4, 5, 6, 7],
    [0, 1, 2, 3, 4, 5, 6, 7, 8],
    [1, 2, 3, 4, 5, 6, 7],
    [2, 3, 4, 5, 6],
    [3, 4, 5],
    [4],
  ];

  const cellSize = 8;
  const gap = 1;
  const totalSize = 9 * cellSize + 8 * gap; // 80px

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${totalSize} ${totalSize}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="The Dot logo"
      role="img"
    >
      {gridRows.flatMap((cols, rIndex) =>
        cols.map((cIndex) => (
          <rect
            key={`${rIndex}-${cIndex}`}
            x={cIndex * (cellSize + gap)}
            y={rIndex * (cellSize + gap)}
            width={cellSize}
            height={cellSize}
            fill={color}
          />
        ))
      )}
    </svg>
  );
}
