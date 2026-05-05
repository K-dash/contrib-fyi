import { STORAGE_KEYS } from '@/lib/constants/storageKeys';
import {
  encodeToken,
  decodeToken,
  LEGACY_TOKEN_KEY,
} from '@/lib/store/tokenEncoding';

export class TokenService {
  private static instance: TokenService;

  static getInstance(): TokenService {
    if (!TokenService.instance) {
      TokenService.instance = new TokenService();
    }
    return TokenService.instance;
  }

  getToken(): string | null {
    if (typeof window === 'undefined') {
      return process.env.NEXT_PUBLIC_GITHUB_TOKEN ?? null;
    }

    try {
      const sessionEncoded = sessionStorage.getItem(STORAGE_KEYS.TOKEN);
      if (!sessionEncoded) return null;
      const stored = JSON.parse(sessionEncoded)?.state?.token;
      if (!stored) return null;
      const decoded = decodeToken(stored);
      return decoded || null;
    } catch {
      // SecurityError in privacy mode, JSON parse failures, etc.
      return null;
    }
  }

  setToken(token: string) {
    if (typeof window === 'undefined') return;
    try {
      const encoded = encodeToken(token);
      sessionStorage.setItem(
        STORAGE_KEYS.TOKEN,
        JSON.stringify({ state: { token: encoded } })
      );
    } catch {
      // sessionStorage unavailable (privacy mode, quota, etc.)
    }
  }

  clearToken() {
    if (typeof window === 'undefined') return;
    try {
      sessionStorage.removeItem(STORAGE_KEYS.TOKEN);
    } catch {
      // ignore
    }
    try {
      localStorage.removeItem(LEGACY_TOKEN_KEY);
    } catch {
      // ignore
    }
  }
}
