import { readFileSync } from "fs";
import path from "path";

function getSkillGroups() {
  const raw = readFileSync(
    path.join(process.cwd(), "content", "skills.json"),
    "utf8",
  );
  return JSON.parse(raw).groups as {
    name: string;
    items: string[];
  }[];
}

export default function Skills() {
  const groups = getSkillGroups();

  return (
    <section id="skills" className="px-[10vw] pb-32 pt-4">
      <h2 className="reveal-view font-display text-3xl font-semibold tracking-tight sm:text-4xl">
        My <span className="text-accent">stack</span>
      </h2>

      <ul className="reveal-view mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/10 bg-accent/15 sm:grid-cols-2 lg:grid-cols-4">
        {groups.map((group) => (
          <li
            key={group.name}
            className="reveal-view bg-bg p-6"
          >
            <h3 className="font-display text-lg font-semibold tracking-tight">
              {group.name}
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-ink"
                >
                  {item}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
}