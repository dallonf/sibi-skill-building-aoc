// Day 5: Supply Stacks

import { assertDeepEquals, assertEquals } from "../utils/assert.js";
import { readTextFile, splitLines } from "../utils/files.js";

/** @typedef {string} Container */

/** @typedef {Container[][]} ContainerStacks */

/**
 * @typedef Instruction
 * @property {number} numberToMove
 * @property {number} from
 * @property {number} to
 */

/**
 * @typedef Input
 * @property {ContainerStacks} stacks
 * @property {Instruction[]} instructions
 */

const TEST_INPUT = readTextFile("days/day05_testinput.txt");

/**
 * @param {string} input
 * @returns {Input}
 */
function parseInput(input) {
  const lines = splitLines(input);
  const linesIterator = lines[Symbol.iterator]();

  /** @type {Container[][]} */
  const stacks = [];
  let next;
  while (((next = linesIterator.next()), !next.done)) {
    const line = next.value;
    if (line.startsWith(" 1 ")) {
      // This is the line that labels the stacks
      break;
    }
    for (
      let index = 0, stack = 0;
      index < line.length;
      index += 4, stack += 1
    ) {
      if (stacks.length <= stack) {
        stacks.push([]);
      }
      const containerInput = line.substring(index, index + 3);
      // Containers might be empty
      if (containerInput.startsWith("[")) {
        stacks[stack].unshift(containerInput.substring(1, 2));
      }
    }
  }

  linesIterator.next(); // blank line
  /** @type {Instruction[]} */
  const instructions = [];
  while (((next = linesIterator.next()), !next.done)) {
    const line = next.value;
    const words = line.split(" ");
    // 0: "move"
    const numberToMove = parseInt(words[1], 10);
    // 2: "from"
    const from = parseInt(words[3], 10);
    // 4: "to"
    const to = parseInt(words[5], 10);
    instructions.push({ numberToMove, from, to });
  }

  return {
    stacks,
    instructions,
  };
}

const TEST_INPUT_PARSED = parseInput(TEST_INPUT);
assertDeepEquals(TEST_INPUT_PARSED, {
  stacks: [["Z", "N"], ["M", "C", "D"], ["P"]],
  instructions: [
    {
      numberToMove: 1,
      from: 2,
      to: 1,
    },
    {
      numberToMove: 3,
      from: 1,
      to: 3,
    },
    {
      numberToMove: 2,
      from: 2,
      to: 1,
    },
    {
      numberToMove: 1,
      from: 1,
      to: 2,
    },
  ],
});
