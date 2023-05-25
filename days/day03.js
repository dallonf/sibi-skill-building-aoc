import { readTextFile, splitLines } from "../utils/files.js";
import { assertDeepEquals, assertEquals, assertTrue } from "../utils/assert.js";

const TEST_INPUT = `
vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw
`.trim();

const PUZZLE_INPUT = readTextFile("days/day03_puzzleinput.txt");

const TEST_RUCKSACKS = splitLines(TEST_INPUT);

/**
 * Gets the contents of the rucksack's two compartments.
 *
 * @param {string} rucksack
 * @returns {[string, string]}
 */
function splitRucksack(rucksack) {
  const midpoint = Math.floor(rucksack.length / 2);
  return [rucksack.slice(0, midpoint), rucksack.slice(midpoint)];
}

assertDeepEquals(splitRucksack(TEST_RUCKSACKS[0]), [
  "vJrwpWtwJgWr",
  "hcsFMMfFFhFp",
]);

/**
 * Find the item that is in both compartments of the rucksack.
 * Assumes there is only one.
 *
 * @param {string} rucksack
 * @returns {string | null}
 */
function findCommonItem(rucksack) {
  const [compartment1, compartment2] = splitRucksack(rucksack);
  const compartment1Set = new Set(compartment1);
  for (const item of compartment2) {
    if (compartment1Set.has(item)) {
      return item;
    }
  }
  return null;
}

assertEquals(findCommonItem(TEST_RUCKSACKS[0]), "p");
assertEquals(findCommonItem(TEST_RUCKSACKS[1]), "L");
assertEquals(findCommonItem(TEST_RUCKSACKS[2]), "P");

const LOWERCASE_A_CHAR_CODE = "a".charCodeAt(0);
const UPPERCASE_A_CHAR_CODE = "A".charCodeAt(0);

/**
 * Gets the priority score of an item.
 * Items are represented by a single character a-z or A-Z.
 *
 * @param {string} item
 * @returns {number}
 */
function getPriority(item) {
  if (!item.match(/^[a-zA-Z]$/)) {
    throw new Error(
      `Invalid item, must be a single character a-z or A-Z: ${item}`
    );
  }
  if (item === item.toLowerCase()) {
    return item.charCodeAt(0) - LOWERCASE_A_CHAR_CODE + 1;
  }
  if (item === item.toUpperCase()) {
    return item.charCodeAt(0) - UPPERCASE_A_CHAR_CODE + 1 + 26;
  }
  throw new Error(`I have no idea how we got here lol. Item code is ${item}`);
}

assertEquals(getPriority("p"), 16);
assertEquals(getPriority("L"), 38);
assertEquals(getPriority("P"), 42);
assertEquals(getPriority("v"), 22);

/**
 * @param {string} input
 * @returns {number}
 */
function partOne(input) {
  const rucksacks = splitLines(input);
  const commonItemsPerRucksack = rucksacks.map((rucksack) => {
    const commonItem = findCommonItem(rucksack);
    if (commonItem === null) {
      throw new Error(`No common item in rucksack: ${rucksack}`);
    }
    return commonItem;
  });
  const priorities = commonItemsPerRucksack.map(getPriority);
  return priorities.reduce((a, b) => a + b, 0);
}

assertEquals(partOne(TEST_INPUT), 157);

const part1Answer = partOne(PUZZLE_INPUT);
console.log("Part 1:", part1Answer);
assertEquals(part1Answer, 8243);
