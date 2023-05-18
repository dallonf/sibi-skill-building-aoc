/**
 * @param {boolean} condition
 * @param {string} [message]
 */
export function assertTrue(condition, message) {
  if (!condition) {
    const errorMessage = message
      ? `Assertion failed: ${message}`
      : "Assertion failed";
    throw new Error(errorMessage);
  }
}

/**
 * @template T
 *
 * @param {T} actual
 * @param {T} expected
 * @param {string} [message]
 */
export function assertEquals(actual, expected, message) {
  let assertMessage = `Expected ${expected} to equal ${actual}; actually was ${actual}`;
  if (message) {
    assertMessage = `${message}. ${assertMessage}`;
  }
  assertTrue(expected === actual, assertMessage);
}
