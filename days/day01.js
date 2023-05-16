// Day 1: Calorie Counting
import { assertEquals } from "../utils/assert.js";
import { readTextFile, splitLines } from "../utils/files.js";

const TEST_INPUT = `
1000
2000
3000

4000

5000
6000

7000
8000
9000

10000
`.trim();

const PUZZLE_INPUT = readTextFile("days/day01_puzzleinput.txt");

/**
 * Expects an input of lists of numbers, each number on its own line, and each list separated by a blank line.
 *
 * @param {string} input
 * @returns {number[][]} A list of lists of numbers; each list represents the food an elf is carrying and how many calories each item has.
 */
function parseInput(input) {
  const lines = splitLines(input);
  const result = [];
  let currentElf = [];
  for (const line of lines) {
    if (line === "") {
      result.push(currentElf);
      currentElf = [];
    } else {
      currentElf.push(parseInt(line, 10));
    }
  }
  return result;
}

/**
 * Returns the maximum number of calories any elf is carrying.
 *
 * @param {number[][]} elves
 * @returns {number}
 */
function getMaxCalories(elves) {
  /** @type {number[]} */
  const totalCaloriesPerElf = elves.map((elf) =>
    elf.reduce((acc, curr) => acc + curr, 0)
  );
  return Math.max(...totalCaloriesPerElf);
}

assertEquals(
  24000,
  getMaxCalories(parseInput(TEST_INPUT)),
  "Part 1, test input"
);

const part1Answer = getMaxCalories(parseInput(PUZZLE_INPUT));
console.log("Part 1 answer:", part1Answer);
assertEquals(part1Answer, 72511, "Part 1");
