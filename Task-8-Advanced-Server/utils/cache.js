const store = new Map();

function set(key, value, ttlSeconds) {
  store.set(key, {
    value,
    expiresAt: Date.now() + ttlSeconds * 1000,
  });
}

function get(key) {
  const item = store.get(key);
  if (!item) return null;
  if (Date.now() > item.expiresAt) {
    store.delete(key);
    return null;
  }
  return item.value;
}

module.exports = { get, set };
