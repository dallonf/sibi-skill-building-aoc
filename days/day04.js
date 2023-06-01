// Day 4: Camp Cleanup

import { assertEquals } from "../utils/assert.js";
import { readTextFile, splitLines } from "../utils/files.js";

const TEST_INPUT = `
2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8
`.trim();
const PUZZLE_INPUT = readTextFile("days/day04_puzzleinput.txt");

/**
 * @typedef Range
 * @property {number} start
 * @property {number} end
 */

/** @typedef {[Range, Range]} RangePair */

/**
 * Examples of input:
 * 2-4
 * 6-8
 *
 * @param {string} input
 * @returns {Range}
 */
function parseRange(input) {
  const [start, end] = input.split("-").map((number) => parseInt(number, 10));
  return { start, end };
}

/**
 * Examples of input:
 * 2-4,6-8
 * 2-3,4-5
 *
 * @param {string} input
 * @returns {RangePair}
 */
function parseRangePair(input) {
  const [first, second] = input.split(",");
  return [parseRange(first), parseRange(second)];
}

const TEST_INPUT_PARSED = splitLines(TEST_INPUT).map(parseRangePair);
const PUZZLE_INPUT_PARSED = splitLines(PUZZLE_INPUT).map(parseRangePair);

/**
 * Does the range contain this number?
 *
 * @param {Range} range
 * @param {number} number
 */
function rangeContainsNumber(range, number) {
  return number >= range.start && number <= range.end;
}
assertEquals(rangeContainsNumber(parseRange("2-4"), 1), false);
assertEquals(rangeContainsNumber(parseRange("2-4"), 2), true);
assertEquals(rangeContainsNumber(parseRange("2-4"), 3), true);
assertEquals(rangeContainsNumber(parseRange("2-4"), 4), true);
assertEquals(rangeContainsNumber(parseRange("2-4"), 5), false);

/**
 * Does range a fully contain range b?
 *
 * @param {Range} a
 * @param {Range} b
 * @returns {boolean}
 */
function rangeContainsOtherRange(a, b) {
  return rangeContainsNumber(a, b.start) && rangeContainsNumber(a, b.end);
}
assertEquals(
  rangeContainsOtherRange(parseRange("2-8"), parseRange("3-7")),
  true
);
assertEquals(
  rangeContainsOtherRange(parseRange("3-7"), parseRange("2-8")),
  false
);

/**
 * In how many pairs does one range fully contain the other?
 *
 * @param {RangePair[]} pairs
 * @returns {number}
 */
function partOne(pairs) {
  return pairs.filter(
    ([a, b]) => rangeContainsOtherRange(a, b) || rangeContainsOtherRange(b, a)
  ).length;
}

assertEquals(partOne(TEST_INPUT_PARSED), 2);

const partOneAnswer = partOne(PUZZLE_INPUT_PARSED);
console.log("Part one:", partOneAnswer);
assertEquals(partOneAnswer, 305);

/**
 * Does the two ranges overlap?
 *
 * @param {Range} a
 * @param {Range} b
 * @returns {boolean}
 */
function rangesOverlap(a, b) {
  return (
    rangeContainsNumber(a, b.start) ||
    rangeContainsNumber(a, b.end) ||
    rangeContainsNumber(b, a.start) ||
    rangeContainsNumber(b, a.end)
  );
}
assertEquals(rangesOverlap(parseRange("5-7"), parseRange("7-9")), true);
assertEquals(rangesOverlap(parseRange("7-9"), parseRange("5-7")), true);
assertEquals(rangesOverlap(parseRange("2-8"), parseRange("3-7")), true);
assertEquals(rangesOverlap(parseRange("2-4"), parseRange("6-8")), false);
assertEquals(rangesOverlap(parseRange("2-3"), parseRange("4-5")), false);

/**
 * In how many pairs do the ranges overlap?
 * @param {RangePair[]} pairs
 * @returns {number}
 */
function partTwo(pairs) {
  return pairs.filter(([a, b]) => rangesOverlap(a, b)).length;
}

assertEquals(partTwo(TEST_INPUT_PARSED), 4);

const partTwoAnswer = partTwo(PUZZLE_INPUT_PARSED);
console.log("Part two:", partTwoAnswer);
assertEquals(partTwoAnswer, 811);
