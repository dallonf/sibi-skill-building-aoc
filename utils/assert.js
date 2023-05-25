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

/** @typedef {string | number | boolean | null | undefined} Scalar */
/** @typedef {Scalar | { [key: string]: SerializableValue } | { [index: number]: SerializableValue } } SerializableValue */

/**
 * @template {Scalar} T
 *
 * @param {T} actual
 * @param {T} expected
 * @param {string} [message]
 */
export function assertEquals(actual, expected, message) {
  let assertMessage = `Expected ${actual} to equal ${expected}`;
  if (message) {
    assertMessage = `${message}. ${assertMessage}`;
  }
  assertTrue(expected === actual, assertMessage);
}

/**
 * @template {SerializableValue} T
 *
 * @param {T} actual
 * @param {T} expected
 * @param {string} [message]
 */
export function assertDeepEquals(actual, expected, message) {
  const expectedJson = JSON.stringify(expected, null, 2);
  const actualJson = JSON.stringify(actual, null, 2);
  let assertMessage = `Expected ${actualJson} to deep equal ${expectedJson}`;
  if (message) {
    assertMessage = `${message}. ${assertMessage}`;
  }
  assertTrue(expectedJson === actualJson, assertMessage);
}
