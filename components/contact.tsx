import NetBackdrop from "@/components/net-backdrop";
import site from "@/content/site.json";
import { isTodo } from "@/lib/ui";

const iconProps = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  "aria-hidden": true,
} as const;

function MailIcon() {
  return (
    <svg {...iconProps} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 6L2 7" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg {...iconProps} fill="currentColor">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg {...iconProps} fill="currentColor">
      <path d="M12 .3a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.33-1.76-1.33-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5 1 .1-.78.42-1.31.76-1.61-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.11-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6.01 0c2.29-1.55 3.3-1.23 3.3-1.23.65 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.63-5.49 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 12 .3z" />
    </svg>
  );
}

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
          aria-label={`Email ${site.shortName}: ${site.email}`}
          title={site.email}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-accent/40 text-accent transition hover:bg-accent/10"
        >
          <MailIcon />
        </a>
        <a
          href={site.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn profile"
          title="LinkedIn"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-accent/40 text-accent transition hover:bg-accent/10"
        >
          <LinkedInIcon />
        </a>
        {github && (
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            title="GitHub"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-accent/40 text-accent transition hover:bg-accent/10"
          >
            <GitHubIcon />
          </a>
        )}
        </div>
      </div>
    </section>
  );
}