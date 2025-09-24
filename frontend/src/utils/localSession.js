// Uses sessionStorage with a safe fallback to in-memory storage
const storage = (() => {
    try {
        const testKey = "__test__";
        window.sessionStorage.setItem(testKey, "1");
        window.sessionStorage.removeItem(testKey);
        return window.sessionStorage;
    } catch {
        const mem = new Map();
        return {
            getItem: (key) => (mem.has(key) ? mem.get(key) : null),
            setItem: (key, value) => mem.set(key, String(value)),
            removeItem: (key) => mem.delete(key),
        };
    }
})();

const localSession = {
    getItem: (key) => storage.getItem(key),
    setItem: (key, value) => storage.setItem(key, value),
    removeItem: (key) => storage.removeItem(key),
};

export default localSession;