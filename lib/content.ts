import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface Metric {
  label: string;
  value: string;
}

export interface WorkLinks {
  live?: string;
  repo?: string;
}

export interface Work {
  title: string;
  slug: string;
  summary: string;
  /** Building the product under. Absent for projects without one. */
  company?: string;
  role: string;
  timeline: string;
  year: string;
  stack: string[];
  links: WorkLinks;
  metrics: Metric[];
  /** Cover media: image path, or a recording video path under /public. */
  image?: string;
  video?: string;
  imageWidth?: number;
  imageHeight?: number;
  featured: boolean;
  order: number;
  /** Raw MDX body, to be rendered by MDXRemote. */
  raw: string;
}

const WORK_DIR = path.join(process.cwd(), "content", "work");

function readWork(file: string): Work {
  const slugFromFile = file.replace(/\.mdx$/, "");
  const source = fs.readFileSync(path.join(WORK_DIR, file), "utf8");
  const { data, content } = matter(source);
  const fm = data as Partial<Work>;
  return {
    title: fm.title ?? slugFromFile,
    slug: fm.slug ?? slugFromFile,
    summary: fm.summary ?? "",
    company: typeof fm.company === "string" ? fm.company : undefined,
    role: fm.role ?? "",
    timeline: fm.timeline ?? "",
    year: fm.year ?? "",
    stack: fm.stack ?? [],
    links: fm.links ?? {},
    metrics: fm.metrics ?? [],
    image: typeof fm.image === "string" ? fm.image : undefined,
    video: typeof fm.video === "string" ? fm.video : undefined,
    imageWidth: typeof fm.imageWidth === "number" ? fm.imageWidth : undefined,
    imageHeight: typeof fm.imageHeight === "number" ? fm.imageHeight : undefined,
    featured: fm.featured === true,
    order: fm.order ?? 99,
    raw: content,
  };
}

/** Featured first, then in the owner's listed order. */
export function getAllWorks(): Work[] {
  return fs
    .readdirSync(WORK_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map(readWork)
    .sort((a, b) => Number(b.featured) - Number(a.featured) || a.order - b.order);
}

export function getWork(slug: string): Work | undefined {
  return getAllWorks().find((w) => w.slug === slug);
}