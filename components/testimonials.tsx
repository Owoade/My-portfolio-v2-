import { readFileSync } from "fs";
import path from "path";

interface QuoteEntry {
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar?: string;
  approved: boolean;
}

function getApprovedQuotes(): QuoteEntry[] {
  const raw = readFileSync(
    path.join(process.cwd(), "content", "recommendations.json"),
    "utf8",
  );
  const data = JSON.parse(raw) as { quotes: QuoteEntry[] };
  return data.quotes.filter((q) => q.approved);
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]!.toUpperCase())
    .join("");
}

function Avatar({ name, src }: { name: string; src?: string }) {
  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt=""
        className="h-11 w-11 rounded-full object-cover"
      />
    );
  }
  return (
    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent/15 text-xs font-semibold text-accent">
      {initials(name)}
    </span>
  );
}

export default function Testimonials() {
  const entries = getApprovedQuotes().filter(
    (q) => !q.quote.startsWith("TODO(owner)"),
  );
  // Nothing approved yet: the section stays off the page entirely.
  if (entries.length === 0) return null;

  return (
    <section id="testimonials" className="px-5 sm:px-[10vw] pb-32">
      <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
        Kind <span className="text-accent">words</span>
      </h2>

      <ul className="mt-10 grid gap-4 sm:grid-cols-2">
        {entries.map((entry, i) => (
          <li
            key={i}
            className="flex flex-col rounded-2xl border border-white/10 bg-surface p-6 transition duration-300 hover:-translate-y-1 hover:border-accent/40"
          >
            <p className="text-base leading-relaxed text-ink/90">
              &ldquo;{entry.quote}&rdquo;
            </p>
            <div className="mt-6 flex items-center gap-3">
              <Avatar name={entry.name} src={entry.avatar} />
              <div>
                <p className="text-sm font-semibold">{entry.name}</p>
                <p className="text-xs text-muted">{entry.role}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}