type AsyncResult<T> = Promise<[T | null, Error | null]>;

export async function safeAsync<T>(fn: () => Promise<T>): AsyncResult<T> {
  try {
    const result = await fn();
    return [result, null];
  } catch (error) {
    return [null, error instanceof Error ? error : new Error(String(error))];
  }
}
