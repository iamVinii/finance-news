"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ITEMS = [
  { href: "/",            label: "Início",     icon: "🏠" },
  { href: "/noticias",    label: "Notícias",   icon: "📰" },
  { href: "/indicadores", label: "Mercado",    icon: "📊" },
  { href: "/newsletter",  label: "Newsletter", icon: "✉️" },
  { href: "/conta",       label: "Conta",      icon: "👤" },
];

export function BottomNav() {
  const pathname = usePathname();
  return (
    <nav className="hidden max-md:flex fixed bottom-0 left-0 right-0 h-[60px] bg-nav backdrop-blur-md border-t-[0.5px] border-border z-50 justify-around items-center px-2 pb-1.5">
      {ITEMS.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`flex flex-col items-center gap-0.5 text-[10px] no-underline px-3 py-1 rounded-lg ${
            pathname === item.href ? "text-accent-text" : "text-text-muted"
          }`}
        >
          <span className="text-xl leading-none">{item.icon}</span>
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
