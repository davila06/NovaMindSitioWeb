import { readdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import matter from "gray-matter";

const root = fileURLToPath(new URL("../", import.meta.url));
const directory = path.join(root, "content/blog");
const files = (await readdir(directory))
  .filter((file) => file.endsWith(".mdx"))
  .sort();
const posts = await Promise.all(
  files.map(async (file) => {
    const source = await readFile(path.join(directory, file), "utf8");
    const { data, content } = matter(source);
    if (data.date instanceof Date)
      data.date = data.date.toISOString().slice(0, 10);
    return {
      slug: file.replace(/\.mdx$/, ""),
      ...data,
      content: content.trim(),
    };
  }),
);
await writeFile(
  path.join(root, "data/blog-index.json"),
  `${JSON.stringify(posts, null, 2)}\n`,
);
console.log(`Indexed ${posts.length} blog posts.`);
