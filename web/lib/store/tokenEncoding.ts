/**
 * Encodes a token to base64, handling UTF-8 characters properly.
 * Falls back to returning the original token if encoding fails.
 *
 * Note: this is obfuscation, not encryption. Anyone with access to the
 * stored value can trivially decode it.
 */
export const encodeToken = (token: string): string => {
  if (typeof btoa !== 'function') {
    return token;
  }

  try {
    return btoa(token);
  } catch {
    try {
      if (typeof TextEncoder !== 'undefined') {
        const bytes = new TextEncoder().encode(token);
        const binString = Array.from(bytes, (byte) =>
          String.fromCodePoint(byte)
        ).join('');
        return btoa(binString);
      }
    } catch {
      // fall through
    }
    return token;
  }
};

/**
 * Decodes a base64-encoded token, handling UTF-8 characters properly.
 * Falls back to returning the original value if decoding fails.
 */
export const decodeToken = (value: string): string => {
  if (typeof atob !== 'function') {
    return value;
  }

  try {
    const decoded = atob(value);

    if (/[\x80-\xFF]/.test(decoded)) {
      try {
        if (typeof TextDecoder !== 'undefined') {
          const bytes = Uint8Array.from(decoded, (char) => char.charCodeAt(0));
          return new TextDecoder().decode(bytes);
        }
      } catch {
        return decoded;
      }
    }

    return decoded;
  } catch {
    return value;
  }
};

export const LEGACY_TOKEN_KEY = 'github_token';
