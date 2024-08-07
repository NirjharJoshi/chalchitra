export function handleAsync(fn) {
  return async function (...args) {
    try {
      return await fn(...args);
    } catch (err) {
      console.error(`💥 ${err.message}`);
    }
  };
}
