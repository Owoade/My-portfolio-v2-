import NetBackdrop from "@/components/net-backdrop";
import Contact from "@/components/contact";
import RevealClient from "@/components/reveal-client";
import Testimonials from "@/components/testimonials";
import Works from "@/components/works";

export default function Home() {
  return (
    <main>
      <RevealClient />
      <section className="relative flex min-h-[100dvh] flex-col items-start justify-center overflow-hidden px-5 sm:px-[10vw]">
        <NetBackdrop />
        <h1 className="relative z-10 font-display text-[clamp(2.75rem,9vw,8rem)] font-semibold leading-[1.05] tracking-tight">
          <span className="reveal block" style={{ animationDelay: "0.1s" }}>
            Hello,
          </span>
          <br />
          <span className="reveal block" style={{ animationDelay: "0.3s" }}>
            I&apos;m&nbsp;
            <span
              className="reveal text-accent"
              style={{ animationDelay: "0.45s" }}
            >
              Anuoluwapo
            </span>
          </span>
        </h1>
        <p
          className="reveal relative z-10 mt-6 text-base text-muted sm:text-lg"
          style={{ animationDelay: "0.7s" }}
        >
          A software engineer with 6+ years of experience building reliable,
          high-performance web applications that solve real-world problems.
        </p>

        <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
          <a
            href="#works"
            aria-label="Scroll down to view works"
            title="View works"
            className="scroll-cue reveal p-2 text-xs font-medium uppercase tracking-widest text-muted transition hover:text-accent"
            style={{ animationDelay: "1.2s" }}
          >
            <span className="scroll-cue-arrow">
              <svg
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="m6 7 6 6 6-6" />
                <path d="m6 13 6 6 6-6" />
              </svg>
            </span>
            <span className="mt-1 block">View works</span>
          </a>
        </div>
      </section>

      <Works />

      <Testimonials />

      <Contact />
    </main>
  );
}