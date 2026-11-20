// makefun entry gta6-meme-x-01: this program's whole job is to copy POST.json
// from the repository root into the output directory, where the gate reads it.
// The entry itself is the X post: the house reads the post from X (its first
// picture and its text) and hands that to the judge. Nothing written here is
// judged.
//
// Run locally the way the grader does, with the kit's stand-ins:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const botDir = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

mkdirSync(outputDir, { recursive: true });

const source = join(botDir, "POST.json");
const target = join(outputDir, "POST.json");

// Fail fast with a clear message if POST.json is not the JSON object the
// gate expects, instead of handing the gate a file it cannot read.
let post: unknown;
try {
  post = JSON.parse(readFileSync(source, "utf8"));
} catch (error) {
  console.error(`could not read ${source} as JSON: ${(error as Error).message}`);
  process.exit(1);
}
if (typeof post !== "object" || post === null || typeof (post as { url?: unknown }).url !== "string") {
  console.error(`${source} must be a JSON object with a string "url" field`);
  process.exit(1);
}

try {
  copyFileSync(source, target);
} catch (error) {
  console.error(`could not copy ${source} to ${target}: ${(error as Error).message}`);
  process.exit(1);
}

console.log(`POST.json -> ${target}`);
