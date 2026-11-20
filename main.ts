// makefun entry gta6-meme-x-01: this program's whole job is to copy POST.json
// from the repository root into the output directory, where the gate reads it.
// The entry itself is the X post: the house reads the post from X (its first
// picture and its text) and hands that to the judge. Nothing written here is
// judged.
//
// Run locally the way the grader does, with the kit's stand-ins:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const botDir = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

mkdirSync(outputDir, { recursive: true });

const source = join(botDir, "POST.json");
const target = join(outputDir, "POST.json");

try {
  copyFileSync(source, target);
} catch (error) {
  console.error(`could not copy ${source} to ${target}: ${(error as Error).message}`);
  process.exit(1);
}

console.log(`POST.json -> ${target}`);
