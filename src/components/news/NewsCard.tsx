import { Article } from "../../types/article";
import { timeAgo } from "../../utils/time";


// export function NewsCard({ article, variant = "side" }: { article: Article; variant?: "main" | "side" | "small" }) {
//   const tag = (
//     <span className={`tag-${article.category}`} style={{
//       display: "inline-block", fontSize: 11, fontWeight: 500,
//       padding: "3px 10px", borderRadius: 20, marginBottom: 8,
//     }}>
//       {article.category.charAt(0) + article.category.slice(1).toLowerCase()}
//     </span>
//   );

//   const meta = (
//     <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
//       <span style={{ fontSize: 12, color: "var(--text-muted)" }}>{timeAgo(article.publishedAt)}</span>
//       <span style={{ fontSize: 12, color: "var(--text-muted)" }}>· {article.readingTime} min</span>
//       {article.isPro && <span style={{ fontSize: 10, fontWeight: 500, background: "var(--accent-dim)", color: "var(--accent-text)", padding: "1px 7px", borderRadius: 20 }}>Pro</span>}
//     </div>
//   );

//   if (variant === "main") return (
//     <Link href={`/noticias/${article.slug}`} style={{ textDecoration: "none" }}>
//       <div style={{
//         background: "var(--bg-card)", border: "0.5px solid var(--border)",
//         borderRadius: 12, padding: "28px 24px 24px", minHeight: 260,
//         display: "flex", flexDirection: "column", justifyContent: "flex-end",
//         position: "relative", overflow: "hidden", cursor: "pointer",
//       }}>
//         <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "var(--accent)" }} />
//         {tag}
//         <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, fontWeight: 400, lineHeight: 1.35, color: "var(--text-primary)" }}>
//           {article.title}
//         </h2>
//         {meta}
//       </div>
//     </Link>
//   );

//   if (variant === "small") return (
//     <Link href={`/noticias/${article.slug}`} style={{ textDecoration: "none" }}>
//       <div style={{
//         background: "var(--bg-card)", border: "0.5px solid var(--border)",
//         borderRadius: 10, padding: "14px 16px", cursor: "pointer",
//       }}>
//         {tag}
//         <h4 style={{ fontSize: 13, fontWeight: 500, lineHeight: 1.4, color: "var(--text-primary)" }}>
//           {article.title}
//         </h4>
//         {meta}
//       </div>
//     </Link>
//   );

//   return (
//     <Link href={`/noticias/${article.slug}`} style={{ textDecoration: "none" }}>
//       <div style={{ padding: "0 0 14px", cursor: "pointer" }}>
//         {tag}
//         <h4 style={{ fontSize: 14, fontWeight: 500, lineHeight: 1.4, color: "var(--text-primary)" }}>
//           {article.title}
//         </h4>
//         {meta}
//       </div>
//     </Link>
//   );
// }


export function NewsCard({ article, variant }: { article: Article; variant: "main" | "side" | "small" }) {
  const tag = (
    <span style={{
      display: "inline-block", fontSize: 11, fontWeight: 500,
      padding: "3px 10px", borderRadius: 20, marginBottom: 8,
      background: "rgba(29,158,117,0.12)", color: "var(--accent-text)",
    }}>
      {article.category.charAt(0) + article.category.slice(1).toLowerCase()}
    </span>
  );

  if (variant === "main") return (
    <div style={{
      background: "var(--bg-card)", border: "0.5px solid var(--border)",
      borderRadius: 12, padding: "28px 24px 24px", minHeight: 260,
      display: "flex", flexDirection: "column", justifyContent: "flex-end",
      position: "relative", overflow: "hidden", cursor: "pointer",
    }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "var(--accent)" }} />
      {tag}
      <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, fontWeight: 400, lineHeight: 1.35, color: "var(--text-primary)", marginBottom: 8 }}>
        {article.title}
      </h2>
      <p style={{ fontSize: 12, color: "var(--text-muted)" }}>{timeAgo(article.publishedAt)} · {article.readingTime} min</p>
    </div>
  );

  if (variant === "small") return (
    <div style={{ background: "var(--bg-card)", border: "0.5px solid var(--border)", borderRadius: 10, padding: "14px 16px", cursor: "pointer" }}>
      {tag}
      <p style={{ fontSize: 13, fontWeight: 500, lineHeight: 1.4, color: "var(--text-primary)", marginBottom: 4 }}>{article.title}</p>
      <p style={{ fontSize: 12, color: "var(--text-muted)" }}>{timeAgo(article.publishedAt)}</p>
    </div>
  );

  return (
    <div style={{ padding: "0 0 14px", cursor: "pointer" }}>
      {tag}
      <p style={{ fontSize: 14, fontWeight: 500, lineHeight: 1.4, color: "var(--text-primary)", marginBottom: 4 }}>{article.title}</p>
      <p style={{ fontSize: 12, color: "var(--text-muted)" }}>{timeAgo(article.publishedAt)}</p>
    </div>
  );
}