import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { ComponentProps } from "react";
import { WORKS } from "@/components/works";
import { getAllWorks, getWork } from "@/lib/content";

type Params = { slug: string };

/** Fields still hold "TODO(owner)…" placeholders until the owner fills them in. */
function isReal(value?: string) {
  return (
    typeof value === "string" && value !== "" && !value.startsWith("TODO")
  );
}

export function generateStaticParams() {
  return getAllWorks().map((work) => ({ slug: work.slug }));
}

const mdxComponents = {
  h2: (props: ComponentProps<"h2">) => (
    <h2
      {...props}
      id={
        typeof props.children === "string"
          ? props.children.toLowerCase().replace(/[^a-z]+/g, "-")
          : undefined
      }
      className="font-display mt-12 scroll-mt-24 text-2xl font-semibold tracking-tight first:mt-0"
    />
  ),
  p: (props: ComponentProps<"p">) => (
    <p
      {...props}
      className="mt-4 text-justify leading-relaxed text-ink/80 first-of-type:mt-2"
    />
  ),
};

export default async function WorkPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const work = getWork(slug);
  if (!work) notFound();

  const liveLink = [work.links?.live ?? ""]
    .filter((href) => href && href.startsWith("http") && isReal(href))[0];

  const stack = work.stack.filter(isReal);
  const hasResults = work.raw.includes("## Results");

  return (
    <section className="px-5 sm:px-[10vw] pb-32 pt-20">
      <Link
        href="/#works"
        className="text-sm text-muted transition-colors hover:text-accent"
      >
        ← Back to works
      </Link>

      <div className="mt-6 flex items-start gap-16">
        {/* Main content column */}
        <div className="min-w-0 flex-1">
          {work.company && (
            <p className="text-xs font-medium uppercase tracking-widest text-accent/80">
              {work.company}
            </p>
          )}
          <div className="flex flex-wrap items-center gap-4">
            <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-6xl">
              {work.title}
            </h1>
            {liveLink && (
              <a
                href={liveLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${work.title} live site`}
                className="rounded-lg border border-white/15 bg-white/5 p-2.5 text-ink/80 transition-colors hover:border-accent/50 hover:text-accent"
              >
                <svg
                  aria-hidden="true"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            )}
          </div>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            {work.summary}
          </p>

          {work.video ? (
            <video
              src={work.video}
              poster={work.image}
              autoPlay
              muted
              loop
              playsInline
              className="mt-12 aspect-3/2 w-full rounded-2xl border border-white/10 object-cover"
            />
          ) : (
            work.image && (
              <Image
                src={work.image}
                alt={`${work.title} screenshot`}
                width={work.imageWidth ?? 1600}
                height={work.imageHeight ?? 1066}
                sizes="(min-width: 1024px) 70vw, 90vw"
                className="mt-12 h-auto w-full rounded-2xl border border-white/10"
              />
            )
          )}

          <div className="mt-14">
            <MDXRemote source={work.raw} components={mdxComponents} />
          </div>

          {stack.length > 0 && (
            <div className="mt-14" id="technologies-used">
              <h2 className="font-display scroll-mt-24 text-2xl font-semibold tracking-tight">
                Technologies used
              </h2>
              <ul className="mt-5 flex flex-wrap gap-2">
                {stack.map((tech) => (
                  <li
                    key={tech}
                    className="flex items-center rounded border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-ink/85 transition-colors hover:border-accent/40"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Prev / next projects, following the works grid order. */}
          {(() => {
            const all = getAllWorks();
            const bySlug = new Map(all.map((w) => [w.slug, w.title]));
            const gridIndex = WORKS.findIndex((w) => w.slug === slug);
            const sequence =
              gridIndex === -1 ? all.map((w) => w.slug) : WORKS.map((w) => w.slug);
            const pos = sequence.indexOf(slug);
            const prevSlug = sequence[(pos - 1 + sequence.length) % sequence.length]!;
            const nextSlug = sequence[(pos + 1) % sequence.length]!;
            const prevTitle = bySlug.get(prevSlug) ?? prevSlug;
            const nextTitle = bySlug.get(nextSlug) ?? nextSlug;

            return (
              <nav className="mt-16 flex items-center gap-6 border-t border-white/10 pt-10">
                <Link
                  href={`/work/${prevSlug}`}
                  className="group min-w-0 flex-1"
                >
                  <p className="text-xs uppercase tracking-widest text-muted">
                    Previous
                  </p>
                  <p className="font-display mt-1 truncate text-lg font-semibold tracking-tight transition-colors group-hover:text-accent sm:text-xl">
                    <span aria-hidden="true">← </span>
                    {prevTitle}
                  </p>
                </Link>
                <Link
                  href={`/work/${nextSlug}`}
                  className="group min-w-0 flex-1 text-right"
                >
                  <p className="text-xs uppercase tracking-widest text-muted">
                    Next
                  </p>
                  <p className="font-display mt-1 truncate text-lg font-semibold tracking-tight transition-colors group-hover:text-accent sm:text-xl">
                    {nextTitle}
                    <span aria-hidden="true"> →</span>
                  </p>
                </Link>
              </nav>
            );
          })()}
        </div>

        {/* Section jump-list, pinned alongside the page content on wide screens. */}
        <nav className="sticky top-24 hidden w-44 shrink-0 lg:block">
          <p className="text-xs font-medium uppercase tracking-widest text-muted">
            On this page
          </p>
          <ul className="mt-3 space-y-1 border-l border-white/10">
            {[
              { href: "#problem", label: "Problem" },
              { href: "#solution", label: "Solution" },
              ...(hasResults ? [{ href: "#results", label: "Results" }] : []),
              ...(stack.length > 0
                ? [{ href: "#technologies-used", label: "Technologies" }]
                : []),
            ].map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="block border-l-2 border-transparent py-1.5 pl-3 text-sm text-muted transition-colors hover:border-accent/60 hover:text-accent"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}