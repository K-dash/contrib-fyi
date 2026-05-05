'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { StateStorage } from 'zustand/middleware';
import { encodeToken, decodeToken, LEGACY_TOKEN_KEY } from './tokenEncoding';

interface TokenState {
  token: string | null;
  setToken: (token: string) => void;
  clearToken: () => void;
}

const STORAGE_KEY = 'contrib-fyi-token';

const sessionTokenStorage: StateStorage = {
  getItem: (name) => {
    if (typeof sessionStorage === 'undefined') return null;
    const value = sessionStorage.getItem(name);
    if (!value) return null;
    try {
      const parsed = JSON.parse(value);
      if (parsed?.state?.token) {
        parsed.state.token = decodeToken(parsed.state.token);
      }
      return JSON.stringify(parsed);
    } catch {
      return value;
    }
  },
  setItem: (name, value) => {
    if (typeof sessionStorage === 'undefined') return;
    try {
      const parsed = JSON.parse(value);
      if (parsed?.state?.token) {
        parsed.state.token = encodeToken(parsed.state.token);
      }
      sessionStorage.setItem(name, JSON.stringify(parsed));
    } catch {
      sessionStorage.setItem(name, value);
    }
  },
  removeItem: (name) => {
    if (typeof sessionStorage === 'undefined') return;
    sessionStorage.removeItem(name);
  },
};

const removeLegacyToken = () => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(LEGACY_TOKEN_KEY);
  } catch {
    // ignore — privacy mode etc.
  }
};

export const useTokenStore = create<TokenState>()(
  persist(
    (set) => ({
      token: null,
      setToken: (token) => set({ token }),
      clearToken: () => {
        removeLegacyToken();
        set({ token: null });
      },
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => sessionTokenStorage),
    }
  )
);

if (typeof window !== 'undefined') {
  try {
    const legacy = localStorage.getItem(LEGACY_TOKEN_KEY);
    if (legacy) {
      if (!useTokenStore.getState().token) {
        useTokenStore.getState().setToken(legacy);
      }
      localStorage.removeItem(LEGACY_TOKEN_KEY);
    }
  } catch {
    // ignore
  }
}
