// The Most Boring Object, Reviewed in One Line.
// Entry: one line, 1-200 characters. No dependencies, fully deterministic:
// no randomness, no time, no network, no environment, no files outside this repo.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const ENTRY =
  "This plain white wall has stared at me for three years without a single interesting thought, and honestly, I have never respected anything more.";

function main(): void {
  if (ENTRY.length < 1 || ENTRY.length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${ENTRY.length}`);
  }
  if (ENTRY.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
    throw new Error("entry must be a single line");
  }

  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", ENTRY, "utf8");

  const roundTrip = readFileSync("/output/entry.txt", "utf8");
  if (roundTrip !== ENTRY) {
    throw new Error("round-trip check failed: file content differs from entry");
  }

  process.stdout.write(ENTRY + "\n");
}

main();
