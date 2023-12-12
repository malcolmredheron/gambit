// Logs a value along with a description, and returns the value. Useful for
// debugging without needing to extract variables.
export function vlog<T>(description: string, value: T): T {
  console.log(description, value);
  return value;
}
