const STORAGE_KEY = "url_shortener_db";

export function loadDB() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || { entries: [] };
  } catch {
    return { entries: [] };
  }
}

export function saveDB(db) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
}

export function addOrUpdateEntry(entry) {
  const db = loadDB();
  const idx = db.entries.findIndex((e) => e.shortcode === entry.shortcode);
  if (idx >= 0) db.entries[idx] = entry;
  else db.entries.push(entry);
  saveDB(db);
}

export function findEntry(code) {
  const db = loadDB();
  return db.entries.find((e) => e.shortcode === code);
}

export function generateShortcode(len = 6) {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let out = "";
  for (let i = 0; i < len; i++) {
    out += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return out;
}
