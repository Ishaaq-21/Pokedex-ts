type CacheEntry<T> = {
  createdAt: number;
  val: T;
};

export class Cache {
  #cache = new Map<string, CacheEntry<any>>();
  #reapIntervaliId: NodeJS.Timeout | undefined = undefined;

  #interval: number;

  constructor(interval: number) {
    this.#interval = interval;
    this.#startReapLoop();
  }
  add<T>(key: string, val: T) {
    this.#cache.set(key, { createdAt: Date.now(), val: val });
  }

  get<T>(key: string) {
    if (this.#cache.has(key)) return this.#cache.get(key);
    return undefined;
  }

  #reap() {
    const now = Date.now();
    for (const [key, entry] of this.#cache) {
      if (now - entry.createdAt >= this.#interval) {
        this.#cache.delete(key);
      }
    }
  }

  #startReapLoop() {
    this.#reapIntervaliId = setInterval(() => {
      this.#reap();
    }, this.#interval);
  }

  stopReapLoop() {
    if (this.#reapIntervaliId) {
      clearInterval(this.#reapIntervaliId);
      this.#reapIntervaliId = undefined;
    }
  }
}
