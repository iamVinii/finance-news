"use client";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const stored = localStorage.getItem("fn-theme") as "light" | "dark" | null;
    const preferred = stored || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    setTheme(preferred);
    document.documentElement.setAttribute("data-theme", preferred);
  }, []);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("fn-theme", next);
  }

  return (
    <button
      onClick={toggle}
      aria-label="Alternar tema"
      className="w-9 h-9 rounded-lg border-[0.5px] border-border-strong bg-secondary text-text-secondary cursor-pointer flex items-center justify-center text-base shrink-0"
    >
      {theme === "dark" ? "☀" : "☾"}
    </button>
  );
}
