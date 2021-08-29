/**
 * Returns a non-empty string value or undefined
 *
 * Basically turns empty strings into undefined, which enables them to
 * be filtered out in undefined checks.
 */
export function stringValueOrUndefined(str: string | undefined) {
  if (str === undefined || str.length === 0) {
    return undefined
  }
  return str
}
