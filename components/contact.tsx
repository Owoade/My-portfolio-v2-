import NetBackdrop from "@/components/net-backdrop";
import site from "@/content/site.json";
import { isTodo } from "@/lib/ui";

export default function Contact() {
  const github = isTodo(site.github) ? undefined : site.github;

  return (
    <section
      id="contact"
      className="relative flex min-h-[45vh] flex-col justify-end overflow-hidden px-5 pb-32 pt-16 sm:px-[10vw]"
    >
      <NetBackdrop />
      <div className="relative z-10">
        <h2 className="reveal-view font-display text-3xl font-semibold tracking-tight sm:text-4xl">
        Let&apos;s <span className="text-accent">talk</span>
      </h2>
      <p className="reveal-view mt-4 max-w-xl leading-relaxed text-muted">
        I&apos;m currently open to job opportunities: backend and full-stack
        roles and partnerships. Reach out via email or LinkedIn.
      </p>

      <div className="reveal-view mt-8 flex flex-wrap gap-3">
        <a
          href={`mailto:${site.email}`}
          className="rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-[#0a0f0e] transition hover:brightness-110"
        >
          {site.email}
        </a>
        <a
          href={site.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-accent/40 px-6 py-2.5 text-sm font-medium text-accent transition hover:bg-accent/10"
        >
          LinkedIn ↗
        </a>
        {github && (
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-accent/40 px-6 py-2.5 text-sm font-medium text-accent transition hover:bg-accent/10"
          >
            GitHub ↗
          </a>
        )}
        </div>
      </div>
    </section>
  );
}