import Image from "next/image";
import Link from "next/link";

// Pulled from content/work/*.mdx; Claw and Autovendy have no copy yet.
// The works grid order; also drives prev/next navigation on the work pages.
export const WORKS = [
  {
    title: "SmoothBallot",
    slug: "smoothballot",
    image: "/works/smoothballot.png",
    summary:
      "E-voting SaaS platform powering elections across federal universities in Nigeria.",
  },
  {
    title: "SmoothContest",
    slug: "smoothcontest",
    image: "/works/smoothcontest.png",
    summary:
      "Online platform for running paid-vote contests: pageants, talent shows, and awards.",
  },
  {
    title: "SmoothTicket",
    slug: "smoothticket",
    image: "/works/smoothticket.webp",
    summary:
      "Event ticketing for organizers: sell tickets online, issue branded PDF tickets, and track sales from one dashboard.",
  },
  {
    title: "Claw",
    slug: "claw",
    image: "/works/claw.jpeg",
    summary:
      "An AI-powered crypto trading platform with predictive market intelligence.",
  },
  {
    title: "Once Pay",
    slug: "once-pay",
    image: "/works/oncepay.png",
    summary:
      "A unified API for payment gateways: integrate once, accept payments through Paystack, Flutterwave, Korapay, SeerBit, and Monnify.",
  },
  {
    title: "Autovendy",
    slug: "autovendy",
    image: "/works/autovendy.png",
    summary: "A marketplace for cars.",
  },
];

export default function Works() {
  return (
    <section id="works" className="px-5 sm:px-[10vw] pb-32 pt-4">
      <h2 className="reveal-view font-display text-3xl font-semibold tracking-tight sm:text-4xl">
        My <span className="text-accent">works</span>
      </h2>

      <ul className="mt-10 grid gap-4 sm:grid-cols-2">
        {WORKS.map((work) => (
          <li
            key={work.slug}
            className="reveal-view transition-transform duration-300 hover:-translate-y-1"
          >
            <Link
              href={`/work/${work.slug}`}
              className="group relative block aspect-3/2 overflow-hidden rounded-2xl border border-white/10 transition-colors duration-300 hover:border-accent/40"
            >
              <Image
                src={work.image}
                alt=""
                fill
                sizes="(min-width: 640px) 40vw, 90vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
              />
              {/* Scrims so the overlaid copy stays readable on any image. */}
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#0a0f0e] from-0% via-[#0a0f0e]/80 via-20% to-[#0a0f0e]/10 to-50% max-sm:bg-[#0a0f0e]/65"
              />
              <span className="absolute inset-x-0 bottom-0 flex flex-col p-5 sm:p-6">
                <h3 className="font-display text-2xl font-semibold tracking-tight">
                  {work.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink/90 sm:text-ink/75">
                  {work.summary}
                </p>
                <span className="mt-3 inline-flex w-fit items-center gap-1.5 text-sm font-medium text-accent transition-all duration-300 group-hover:gap-2.5">
                  View project
                  <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-0.5">
                    →
                  </span>
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}