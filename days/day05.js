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
const PUZZLE_INPUT = readTextFile("days/day05_puzzleinput.txt");

// Notice how many assumptions I'm making here.
// If this were real user input, I couldn't get away with that! This
// is expecting a very specific format that a human being probably wouldn't get right
// all the time, and they would need helpful error messages to figure out what they did wrong.
// Plus if the input is wrong, it'll at best result in junk data.
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

/**
 * @param {ContainerStacks} stacks
 * @param {number} from
 * @param {number} to
 * @returns {ContainerStacks}
 */
function moveContainer(stacks, from, to) {
  const fromIndex = from - 1;
  const toIndex = to - 1;
  const movedContainer = stacks[fromIndex].at(-1);
  if (!movedContainer) {
    throw new Error(`No container to move from stack ${from}`);
  }
  return stacks.map((stack, index) => {
    if (index === fromIndex) {
      return stack.slice(0, -1);
    }
    if (index === toIndex) {
      return [...stack, movedContainer];
    }
    return stack;
  });
}
assertDeepEquals(moveContainer(TEST_INPUT_PARSED.stacks, 2, 1), [
  ["Z", "N", "D"],
  ["M", "C"],
  ["P"],
]);

/**
 * @param {ContainerStacks} stacks
 * @param {Instruction} instruction
 * @returns {ContainerStacks}
 */
function followInstruction(stacks, instruction) {
  const { numberToMove, from, to } = instruction;
  let result = stacks;
  for (let i = 0; i < numberToMove; i += 1) {
    result = moveContainer(result, from, to);
  }
  return result;
}

/**
 * @param {ContainerStacks} stacks
 * @param {Instruction[]} instructions
 * @returns {ContainerStacks}
 */
function followInstructions(stacks, instructions) {
  return instructions.reduce(followInstruction, stacks);
}

assertDeepEquals(
  followInstructions(TEST_INPUT_PARSED.stacks, TEST_INPUT_PARSED.instructions),
  [["C"], ["M"], ["P", "D", "N", "Z"]]
);

/**
 *
 * @param {ContainerStacks} stacks
 * @returns {string}
 */
function getTopContainersString(stacks) {
  return stacks
    .map((stack) => stack.at(-1))
    .map((container) => container ?? "")
    .join("");
}

assertDeepEquals(
  getTopContainersString(
    followInstructions(TEST_INPUT_PARSED.stacks, TEST_INPUT_PARSED.instructions)
  ),
  "CMZ"
);

/**
 * @param {string} input
 * @returns {string}
 */
function partOne(input) {
  const parsedInput = parseInput(input);
  const result = getTopContainersString(
    followInstructions(parsedInput.stacks, parsedInput.instructions)
  );
  return result;
}

assertEquals(partOne(TEST_INPUT), "CMZ");

const partOneAnswer = partOne(PUZZLE_INPUT);
console.log("Part one:", partOneAnswer);
assertEquals(partOneAnswer, "FWNSHLDNZ");
