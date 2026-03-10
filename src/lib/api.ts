import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export type LoginRequest = {
  email?: string;
  username?: string;
  password: string;
};

export type LoginResponse = {
  token?: string;
  accessToken?: string;
};

export type SignupRequest = {
  name?: string;
  email: string;
  username?: string;
  password: string;
};

export type SignupResponse = {
  token?: string;
  accessToken?: string;
};

export async function login(request: LoginRequest) {
  const { data } = await api.post<LoginResponse>("/api/v1/auth/login", request);
  return data;
}

export async function signup(request: SignupRequest) {
  const { data } = await api.post<SignupResponse>("/api/v1/auth/signup", request);
  return data;
}

export async function fetchDashboardMetrics(token: string) {
  const { data } = await api.get("/api/v1/dashboard/metrics", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}

export async function fetchRecentEvents(token: string) {
  const { data } = await api.get("/api/v1/dashboard/recent-events", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}

export async function fetchInOutEvents(token: string) {
  const { data } = await api.get("/api/v1/in-out/events", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}

export async function fetchInOutStatistics(token: string) {
  const { data } = await api.get("/api/v1/in-out/statistics", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}
