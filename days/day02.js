// Day 2: Rock Paper Scissors

import { assertEquals } from "../utils/assert.js";
import { readTextFile, splitLines } from "../utils/files.js";

/** @typedef {'rock' | 'paper' | 'scissors'} Move  */
/** @typedef {'A' | 'B' | 'C'} StrategyOpponentMove  */
/** @typedef {'X' | 'Y' | 'Z'} StrategyYourMove  */

const TEST_INPUT = `
A Y
B X
C Z
`.trim();
const PUZZLE_INPUT = readTextFile("days/day02_puzzleinput.txt");

/** @typedef {[StrategyOpponentMove, StrategyYourMove]} StrategyEntry */
/** @typedef {StrategyEntry[]} StrategyGuide */

/**
 * @param {string} input
 * @returns {StrategyGuide}
 */
function parseInput(input) {
  const lines = splitLines(input);
  return lines.map((line) => {
    const [opponentMove, yourMove] = line.split(" ");
    if (opponentMove !== "A" && opponentMove !== "B" && opponentMove !== "C") {
      console.log("wat");
      console.log(opponentMove, line);
      throw new Error("Invalid opponent move");
    }
    if (yourMove !== "X" && yourMove !== "Y" && yourMove !== "Z") {
      throw new Error("Invalid player move");
    }
    return [opponentMove, yourMove];
  });
}

/**
 * @param {Move} move
 */
function getWinningResponse(move) {
  switch (move) {
    case "rock":
      return "paper";
    case "paper":
      return "scissors";
    case "scissors":
      return "rock";
  }
}

/**
 * @param {Move} move
 */
function getLosingResponse(move) {
  switch (move) {
    case "rock":
      return "scissors";
    case "paper":
      return "rock";
    case "scissors":
      return "paper";
  }
}

/**
 * @param {object} params
 * @param {Move} params.yourMove
 * @param {Move} params.opponentMove
 * @returns {'you' | 'opponent' | 'tie'}
 */
function getWinner({ yourMove, opponentMove }) {
  if (yourMove === getWinningResponse(opponentMove)) {
    return "you";
  }
  if (yourMove === getLosingResponse(opponentMove)) {
    return "opponent";
  }
  return "tie";
}
assertEquals(getWinner({ yourMove: "rock", opponentMove: "rock" }), "tie");
assertEquals(
  getWinner({ yourMove: "rock", opponentMove: "paper" }),
  "opponent"
);
assertEquals(getWinner({ yourMove: "rock", opponentMove: "scissors" }), "you");

assertEquals(getWinner({ yourMove: "paper", opponentMove: "rock" }), "you");
assertEquals(getWinner({ yourMove: "paper", opponentMove: "paper" }), "tie");
assertEquals(
  getWinner({ yourMove: "paper", opponentMove: "scissors" }),
  "opponent"
);

assertEquals(
  getWinner({ yourMove: "scissors", opponentMove: "rock" }),
  "opponent"
);
assertEquals(getWinner({ yourMove: "scissors", opponentMove: "paper" }), "you");
assertEquals(
  getWinner({ yourMove: "scissors", opponentMove: "scissors" }),
  "tie"
);

/**
 * @param {object} params
 * @param {Move} params.yourMove
 * @param {Move} params.opponentMove
 * @returns {number}
 */
function getScore({ yourMove, opponentMove }) {
  let moveBonus;
  switch (yourMove) {
    case "rock":
      moveBonus = 1;
      break;
    case "paper":
      moveBonus = 2;
      break;
    case "scissors":
      moveBonus = 3;
      break;
    default: {
      /** @type {never} */
      const _exhaustive = yourMove;
      return _exhaustive;
    }
  }

  const winner = getWinner({ yourMove, opponentMove });
  let winBonus;
  switch (winner) {
    case "you":
      winBonus = 6;
      break;
    case "tie":
      winBonus = 3;
      break;
    case "opponent":
      winBonus = 0;
      break;
    default: {
      /** @type {never} */
      const _exhaustive = winner;
      return _exhaustive;
    }
  }

  return moveBonus + winBonus;
}

/**
 * During Part 1, we mistakenly believed the X/Y/Z corresponded to
 * our rock/paper/scissors move.
 *
 * @param {StrategyEntry} entry
 * @returns {number}
 */
function getScoreForEntryMistaken(entry) {
  const [strategyOpponentMove, strategyYourMove] = entry;
  /** @type {Move} */
  let opponentMove;
  switch (strategyOpponentMove) {
    case "A":
      opponentMove = "rock";
      break;
    case "B":
      opponentMove = "paper";
      break;
    case "C":
      opponentMove = "scissors";
      break;
    default: {
      /** @type {never} */
      const _exhaustive = strategyOpponentMove;
      return _exhaustive;
    }
  }

  /** @type {Move} */
  let yourMove;
  switch (strategyYourMove) {
    case "X":
      yourMove = "rock";
      break;
    case "Y":
      yourMove = "paper";
      break;
    case "Z":
      yourMove = "scissors";
      break;
    default: {
      /** @type {never} */
      const _exhaustive = strategyYourMove;
      return _exhaustive;
    }
  }

  return getScore({ yourMove, opponentMove });
}

/**
 * @param {string} input
 * @returns {number}
 */
function part1(input) {
  const strategyGuide = parseInput(input);
  return strategyGuide.map(getScoreForEntryMistaken).reduce((a, b) => a + b, 0);
}

assertEquals(part1(TEST_INPUT), 15);
const part1Answer = part1(PUZZLE_INPUT);
console.log("Part 1:", part1Answer);
assertEquals(part1Answer, 15422);

/**
 * @param {StrategyEntry} entry
 * @returns {number}
 */
function getScoreForEntry(entry) {
  const [strategyOpponentMove, strategyYourMove] = entry;
  /** @type {Move} */
  let opponentMove;
  switch (strategyOpponentMove) {
    case "A":
      opponentMove = "rock";
      break;
    case "B":
      opponentMove = "paper";
      break;
    case "C":
      opponentMove = "scissors";
      break;
    default: {
      /** @type {never} */
      const _exhaustive = strategyOpponentMove;
      return _exhaustive;
    }
  }

  /** @type {Move} */
  let yourMove;
  switch (strategyYourMove) {
    case "X":
      // lose
      yourMove = getLosingResponse(opponentMove);
      break;
    case "Y":
      // draw
      yourMove = opponentMove;
      break;
    case "Z":
      // win
      yourMove = getWinningResponse(opponentMove);
      break;
    default: {
      /** @type {never} */
      const _exhaustive = strategyYourMove;
      return _exhaustive;
    }
  }

  return getScore({ yourMove, opponentMove });
}

/**
 * @param {string} input
 * @returns {number}
 */
function part2(input) {
  const strategyGuide = parseInput(input);
  return strategyGuide.map(getScoreForEntry).reduce((a, b) => a + b, 0);
}

assertEquals(part2(TEST_INPUT), 12);
const part2Answer = part2(PUZZLE_INPUT);
console.log("Part 2:", part2Answer);
assertEquals(part2Answer, 15442);
