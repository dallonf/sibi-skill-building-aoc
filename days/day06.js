// Day 6: Tuning Trouble

import { readTextFile } from "../utils/files.js";
import { assertEquals } from "../utils/assert.js";

const PUZZLE_INPUT = readTextFile("days/day06_puzzleinput.txt");

/**
 * @param {string[]} input
 */
function areAllCharactersDifferent(input) {
  const seenChars = new Set();
  for (const char of input) {
    if (seenChars.has(char)) {
      return false;
    }
    seenChars.add(char);
  }
  return true;
}

/**
 * A marker is N consecutive characters that are all different.
 *
 * @param {string} input
 * @param {number} length
 */
function indexOfMarker(input, length) {
  const charBuffer = [];
  const chars = input.split("");
  for (let i = 0; i < chars.length; i++) {
    charBuffer.push(chars[i]);
    while (charBuffer.length > length) {
      charBuffer.shift();
    }

    if (charBuffer.length === length && areAllCharactersDifferent(charBuffer)) {
      return i + 1;
    }
  }
  return null;
}

/**
 * A start-of-packet marker is four consecutive different characters.
 *
 * @param {string} input
 * @returns {number | null} returns null if no start-of-packet marker is found
 */
function indexOfStartOfPacketMarker(input) {
  return indexOfMarker(input, 4);
}

assertEquals(indexOfStartOfPacketMarker("mjqjpqmgbljsphdztnvjfqwrcgsmlb"), 7);
assertEquals(indexOfStartOfPacketMarker("bvwbjplbgvbhsrlpgdmjqwftvncz"), 5);
assertEquals(indexOfStartOfPacketMarker("nppdvjthqldpwncqszvftbrmjlhg"), 6);
assertEquals(
  indexOfStartOfPacketMarker("nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg"),
  10
);
assertEquals(
  indexOfStartOfPacketMarker("zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw"),
  11
);

const partOneAnswer = indexOfStartOfPacketMarker(PUZZLE_INPUT);
console.log("Part one:", partOneAnswer);
assertEquals(partOneAnswer, 1093);

/**
 * A start-of-message marker is fourteen consecutive different characters.
 *
 * @param {string} input
 * @returns {number | null} returns null if no start-of-message marker is found
 */
function indexOfStartOfMessageMarker(input) {
  return indexOfMarker(input, 14);
}

assertEquals(indexOfStartOfMessageMarker("mjqjpqmgbljsphdztnvjfqwrcgsmlb"), 19);
assertEquals(indexOfStartOfMessageMarker("bvwbjplbgvbhsrlpgdmjqwftvncz"), 23);
assertEquals(indexOfStartOfMessageMarker("nppdvjthqldpwncqszvftbrmjlhg"), 23);
assertEquals(
  indexOfStartOfMessageMarker("nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg"),
  29
);
assertEquals(
  indexOfStartOfMessageMarker("zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw"),
  26
);

const partTwoAnswer = indexOfStartOfMessageMarker(PUZZLE_INPUT);
console.log("Part two:", partTwoAnswer);
assertEquals(partTwoAnswer, 3534);
