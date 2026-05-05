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

    const sessionEncoded = sessionStorage.getItem(STORAGE_KEYS.TOKEN);
    if (!sessionEncoded) return null;

    try {
      const stored = JSON.parse(sessionEncoded)?.state?.token;
      if (!stored) return null;
      const decoded = decodeToken(stored);
      return decoded || null;
    } catch {
      return null;
    }
  }

  setToken(token: string) {
    if (typeof window === 'undefined') return;
    const encoded = encodeToken(token);
    sessionStorage.setItem(
      STORAGE_KEYS.TOKEN,
      JSON.stringify({ state: { token: encoded } })
    );
  }

  clearToken() {
    if (typeof window === 'undefined') return;
    sessionStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(LEGACY_TOKEN_KEY);
  }
}
