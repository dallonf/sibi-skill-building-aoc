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
  /** @type {number[]} */
  let currentElf = [];
  const result = [currentElf];
  for (const line of lines) {
    if (line === "") {
      currentElf = [];
      result.push(currentElf);
    } else {
      currentElf.push(parseInt(line, 10));
    }
  }
  return result;
}

/**
 * Get number of calories for each elf.
 *
 * @param {number[][]} elves
 * @returns {number[]}
 */
function getCaloriesPerElf(elves) {
  return elves.map((elf) => elf.reduce((acc, curr) => acc + curr, 0));
}

/**
 * Returns the maximum number of calories any elf is carrying.
 *
 * @param {number[][]} elves
 * @returns {number}
 */
function getMaxCalories(elves) {
  /** @type {number[]} */
  const totalCaloriesPerElf = getCaloriesPerElf(elves);
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

/**
 * Returns the N elves that are carrying the most calories, and the total calories each one is carrying.
 *
 * @param {number[][]} elves
 * @param {number} n
 * @returns {number[]}
 */
function getTopNElves(elves, n) {
  const totalCaloriesPerElf = getCaloriesPerElf(elves);
  const sortedCalories = totalCaloriesPerElf.sort((a, b) => b - a);
  const topN = sortedCalories.slice(0, n);
  return topN;
}

/**
 * @param {string} input
 * @returns {number}
 */
function part2(input) {
  const elves = parseInput(input);
  const top3 = getTopNElves(elves, 3);
  return top3.reduce((acc, curr) => acc + curr, 0);
}

assertEquals(45000, part2(TEST_INPUT), "Part 2, test input");

const part2Answer = part2(PUZZLE_INPUT);
console.log("Part 2 answer:", part2Answer);
assertEquals(part2Answer, 212117, "Part 2");
