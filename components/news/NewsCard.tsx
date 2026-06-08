import Link from "next/link";
import { Article } from "../../types/article";

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `Há ${mins} min`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `Há ${hrs}h`;
  return `Há ${Math.floor(hrs / 24)}d`;
}

export function NewsCard({ article, variant = "side" }: { article: Article; variant?: "main" | "side" | "small" }) {
  const tag = (
    <span className={`tag-${article.category} inline-block text-[11px] font-medium px-2.5 py-0.5 rounded-full mb-2`}>
      {article.category.charAt(0) + article.category.slice(1).toLowerCase()}
    </span>
  );

  const meta = (
    <div className="flex items-center gap-2 mt-1.5">
      <span className="text-xs text-text-muted">{timeAgo(article.publishedAt)}</span>
      <span className="text-xs text-text-muted">· {article.readingTime} min</span>
      {article.isPro && (
        <span className="text-[10px] font-medium bg-accent-dim text-accent-text px-1.5 py-0.5 rounded-full">
          Pro
        </span>
      )}
    </div>
  );

  if (variant === "main") return (
    <Link href={`/noticias/${article.slug}`} className="no-underline">
      <div className="bg-card border-[0.5px] border-border rounded-xl p-7 min-h-[260px] flex flex-col justify-end relative overflow-hidden cursor-pointer hover:border-accent transition-colors">
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-accent rounded-t-xl" />
        {tag}
        <h2 className="font-display text-[22px] font-normal leading-[1.35] text-text-primary">
          {article.title}
        </h2>
        {meta}
      </div>
    </Link>
  );

  if (variant === "small") return (
    <Link href={`/noticias/${article.slug}`} className="no-underline">
      <div className="bg-card border-[0.5px] border-border rounded-xl p-4 cursor-pointer hover:border-border-strong transition-colors">
        {tag}
        <h4 className="text-[13px] font-medium leading-[1.4] text-text-primary">
          {article.title}
        </h4>
        {meta}
      </div>
    </Link>
  );

  return (
    <Link href={`/noticias/${article.slug}`} className="no-underline">
      <div className="pb-3.5 cursor-pointer">
        {tag}
        <h4 className="text-sm font-medium leading-[1.4] text-text-primary">
          {article.title}
        </h4>
        {meta}
      </div>
    </Link>
  );
}
