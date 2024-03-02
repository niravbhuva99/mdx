import fs from "node:fs/promises";
import { mdxjs } from "micromark-extension-mdxjs";
import { fromMarkdown } from "mdast-util-from-markdown";
import { mdxFromMarkdown, mdxToMarkdown } from "mdast-util-mdx";
import { toMarkdown } from "mdast-util-to-markdown";

const doc = await fs.readFile("./example.mdx");

const tree = fromMarkdown(doc, {
  extensions: [mdxjs()],
  mdastExtensions: [mdxFromMarkdown()],
});

console.log(tree);

const out = toMarkdown(tree, { extensions: [mdxToMarkdown()] });

fs.writeFile("processed.mdx", out, (err) => {
  if (err) {
    console.error("Error writing file:", err);
  } else {
    console.log("Processed MDX content has been saved to processed.mdx");
  }
});
