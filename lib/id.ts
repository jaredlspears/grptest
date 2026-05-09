const CHARS = "abcdefghijklmnopqrstuvwxyz0123456789";

export function generateId(length = 6): string {
  let result = "";
  for (let i = 0; i < length; i++) {
    result += CHARS[Math.floor(Math.random() * CHARS.length)];
  }
  return result;
}
