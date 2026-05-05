import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const STORAGE_KEY = 'contrib-fyi-token';
const LEGACY_KEY = 'github_token';

describe('useTokenStore legacy token migration (module init)', () => {
  beforeEach(() => {
    sessionStorage.clear();
    localStorage.clear();
    vi.resetModules();
  });

  afterEach(() => {
    sessionStorage.clear();
    localStorage.clear();
  });

  it('migrates legacy localStorage token into the session store and removes the legacy key', async () => {
    localStorage.setItem(LEGACY_KEY, 'legacy-token');

    const { useTokenStore } = await import('./useTokenStore');

    expect(useTokenStore.getState().token).toBe('legacy-token');
    expect(localStorage.getItem(LEGACY_KEY)).toBeNull();

    const stored = sessionStorage.getItem(STORAGE_KEY);
    expect(stored).toBeTruthy();
    const parsed = JSON.parse(stored!);
    expect(parsed.state.token).toBe(btoa('legacy-token'));
  });

  it('keeps the existing session token when both legacy and session entries exist, and still clears the legacy key', async () => {
    sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ state: { token: btoa('session-token') }, version: 0 })
    );
    localStorage.setItem(LEGACY_KEY, 'legacy-token');

    const { useTokenStore } = await import('./useTokenStore');

    expect(useTokenStore.getState().token).toBe('session-token');
    expect(localStorage.getItem(LEGACY_KEY)).toBeNull();
  });

  it('is a no-op when no legacy token exists', async () => {
    const { useTokenStore } = await import('./useTokenStore');

    expect(useTokenStore.getState().token).toBeNull();
    expect(localStorage.getItem(LEGACY_KEY)).toBeNull();
    expect(sessionStorage.getItem(STORAGE_KEY)).toBeNull();
  });
});
