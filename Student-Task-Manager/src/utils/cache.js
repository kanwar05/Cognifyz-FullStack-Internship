const cache = new Map();

const setCache = (key, data, ttlMs) => {
  cache.set(key, {
    data,
    expiresAt: Date.now() + ttlMs
  });
};

const getCache = (key) => {
  const item = cache.get(key);
  if (!item) return null;
  if (Date.now() > item.expiresAt) {
    cache.delete(key);
    return null;
  }
  return item.data;
};

const clearExpiredCache = () => {
  for (const [key, item] of cache.entries()) {
    if (Date.now() > item.expiresAt) cache.delete(key);
  }
};

const cacheStatus = () => `${cache.size} active cache item(s)`;

module.exports = {
  setCache,
  getCache,
  clearExpiredCache,
  cacheStatus
};
