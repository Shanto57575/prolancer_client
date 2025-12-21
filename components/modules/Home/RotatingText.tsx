"use client";

import { useEffect, useState } from "react";

const roles = [
  "Find your perfect freelancer",
  "Discover world-class talent",
  "Build your dream team",
  "Scale your business faster",
];

export function RotatingText() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const i = setInterval(() => setIndex((p) => (p + 1) % roles.length), 3000);
    return () => clearInterval(i);
  }, []);

  return (
    <span className="block text-emerald-500 transition-opacity duration-500">
      {roles[index]}
    </span>
  );
}
