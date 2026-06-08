import { useState, useEffect } from "react";
import { Article } from "@/types/article";
import { getPublished } from "@/lib/store";

export function useArticles() {
  const [mounted, setMounted] = useState(false);
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    setArticles(getPublished());
    setMounted(true);

    const onFocus = () => setArticles(getPublished());
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, []);

  return { mounted, articles };
}
