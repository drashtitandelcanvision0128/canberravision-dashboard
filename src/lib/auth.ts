import { jwtDecode } from "jwt-decode";

export const AUTH_COOKIE_NAME = "canberra_token";

export type JwtPayload = {
  sub?: string;
  user_id?: number | string;
  role?: string;
  role_level?: number;
  permissions?: string[];
  assigned_zones?: string[];
  exp?: number;
  iat?: number;
};

export function decodeToken(token: string): JwtPayload | null {
  try {
    return jwtDecode<JwtPayload>(token);
  } catch {
    return null;
  }
}

export function isTokenExpired(token: string): boolean {
  const payload = decodeToken(token);
  if (!payload?.exp) return false;
  const nowSeconds = Math.floor(Date.now() / 1000);
  return payload.exp <= nowSeconds;
}
