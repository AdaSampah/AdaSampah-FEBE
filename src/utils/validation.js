export function validateUsername(uname) {
  if (!/^[A-Za-z0-9_]+$/.test(uname)) return false;
  if (uname.length < 3 || uname.length > 20) return false;
  if (/^_/.test(uname) || /_$/.test(uname)) return false;
  if (/__/.test(uname)) return false;
  return true;
}

export function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
