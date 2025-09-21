export class PromiseExecutor {
  private promises: { key: string; promise: Promise<unknown> }[] = [];

  add(key: string, promise: Promise<unknown>) {
    this.promises.push({ key, promise });
  }

  async execute(): Promise<Record<string, unknown>> {
    const promisesToExecute = [...this.promises];
    const results = await Promise.all(promisesToExecute.map((p) => p.promise));
    this.promises = [];

    return results.reduce<Record<string, unknown>>((acc, result, index) => {
      acc[promisesToExecute[index].key] = result;
      return acc;
    }, {});
  }
}
