"use client";

export function setCookie(name: string, value: string, days = 1) {
  // Check if we're in a browser environment
  if (typeof document === 'undefined') {
    return;
  }
  
  const maxAge = days * 24 * 60 * 60;
  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(
    value,
  )}; Path=/; Max-Age=${maxAge}; SameSite=Lax`;
}

export function getCookie(name: string): string | null {
  // Check if we're in a browser environment
  if (typeof document === 'undefined') {
    return null;
  }
  
  const target = `${encodeURIComponent(name)}=`;
  const parts = document.cookie.split(";");
  for (const part of parts) {
    const trimmed = part.trim();
    if (trimmed.startsWith(target)) {
      return decodeURIComponent(trimmed.slice(target.length));
    }
  }
  return null;
}

export function deleteCookie(name: string) {
  // Check if we're in a browser environment
  if (typeof document === 'undefined') {
    return;
  }
  
  document.cookie = `${encodeURIComponent(name)}=; Path=/; Max-Age=0; SameSite=Lax`;
}
