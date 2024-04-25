import { load } from "../storage/index.mjs";

export function headers() {
  const token = load("token");

  let apiKey;
  try {
    apiKey = import.meta.env.VITE_NOROFF_API_KEY;
  } catch (e) {
    apiKey = process.env.VITE_NOROFF_API_KEY;
  }

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    "X-Noroff-API-Key": apiKey,
  };
}

export async function authFetch(url, options = {}) {
  return fetch(url, {
    ...options,
    headers: headers(),
  });
}
