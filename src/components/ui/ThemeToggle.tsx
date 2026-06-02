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
    <button onClick={toggle} aria-label="Alternar tema" style={{
      width: 36, height: 36, borderRadius: 8,
      border: "0.5px solid var(--border-strong)",
      background: "var(--bg-secondary)",
      color: "var(--text-secondary)",
      cursor: "pointer", display: "flex",
      alignItems: "center", justifyContent: "center",
      fontSize: 16, flexShrink: 0,
    }}>
      {theme === "dark" ? "☀" : "☾"}
    </button>
  );
}
