export function simulateLatency<T>(
  result: T,
  ms = 700,
  failRate = 0.15
): Promise<T> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < failRate) {
        reject(new Error("Erro simulado do servidor"));
      } else {
        resolve(result);
      }
    }, ms);
  });
}
