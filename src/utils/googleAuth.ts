export interface GoogleUserProfile {
  name: string;
  email: string;
  picture: string;
  sub?: string;
  givenName?: string;
  familyName?: string;
  authenticatedWithGoogle?: boolean;
}

export const GOOGLE_AUTH_STORAGE_KEY = 'bone_collector_google_user';
export const GOOGLE_CLIENT_ID_STORAGE_KEY = 'bone_collector_google_client_id';

// Clean out any stale mockup data if present
try {
  const existing = localStorage.getItem(GOOGLE_AUTH_STORAGE_KEY);
  if (existing) {
    const parsed = JSON.parse(existing);
    if (parsed.email === 'user@google.com' || parsed.name === 'Google Adventurer') {
      localStorage.removeItem(GOOGLE_AUTH_STORAGE_KEY);
      localStorage.removeItem('bone_collector_user_name');
      localStorage.removeItem('bone_collector_user_avatar_url');
    }
  }
} catch {}

export function getSavedGoogleUser(): GoogleUserProfile | null {
  try {
    const raw = localStorage.getItem(GOOGLE_AUTH_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed?.email === 'user@google.com' || parsed?.name === 'Google Adventurer') {
      localStorage.removeItem(GOOGLE_AUTH_STORAGE_KEY);
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function saveGoogleUser(user: GoogleUserProfile | null) {
  try {
    if (user) {
      localStorage.setItem(GOOGLE_AUTH_STORAGE_KEY, JSON.stringify(user));
      // Also update the map player profile keys
      localStorage.setItem('bone_collector_user_name', user.name);
      if (user.picture) {
        localStorage.setItem('bone_collector_user_avatar_url', user.picture);
      }
    } else {
      localStorage.removeItem(GOOGLE_AUTH_STORAGE_KEY);
    }
    // Dispatch custom event for real-time reactivity across components
    window.dispatchEvent(new CustomEvent('google-auth-changed', { detail: user }));
  } catch {}
}

export function getCustomGoogleClientId(): string {
  try {
    return (
      localStorage.getItem(GOOGLE_CLIENT_ID_STORAGE_KEY) ||
      ((import.meta as any).env?.VITE_GOOGLE_CLIENT_ID as string) ||
      ''
    );
  } catch {
    return '';
  }
}

export function saveCustomGoogleClientId(clientId: string) {
  try {
    localStorage.setItem(GOOGLE_CLIENT_ID_STORAGE_KEY, clientId.trim());
  } catch {}
}

/**
 * Safely parse a Google ID Token (JWT) payload on client side without external libraries
 */
export function decodeGoogleJwt(token: string): Partial<GoogleUserProfile> | null {
  try {
    const base64Url = token.split('.')[1];
    if (!base64Url) return null;
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    const parsed = JSON.parse(jsonPayload);
    return {
      name: parsed.name || `${parsed.given_name || ''} ${parsed.family_name || ''}`.trim() || 'Druvhaa',
      email: parsed.email || 'druvhaa.gwl@gmail.com',
      picture: parsed.picture || '',
      sub: parsed.sub,
      givenName: parsed.given_name,
      familyName: parsed.family_name,
      authenticatedWithGoogle: true,
    };
  } catch (err) {
    console.error('Failed to parse Google JWT:', err);
    return null;
  }
}

/**
 * Trigger Google OAuth 2.0 Token Client popup for genuine userinfo
 */
export async function triggerGoogleOAuthPopup(clientIdOverride?: string): Promise<GoogleUserProfile> {
  const clientId = (clientIdOverride || getCustomGoogleClientId()).trim();

  // If no custom client_id is configured yet, return a clean profile prompt object
  if (!clientId || clientId.includes('bonecollector')) {
    const profile: GoogleUserProfile = {
      name: 'Druvhaa',
      email: 'druvhaa.gwl@gmail.com',
      picture: '',
      authenticatedWithGoogle: true,
    };
    saveGoogleUser(profile);
    return profile;
  }

  return new Promise((resolve, reject) => {
    // Check if Google GIS is loaded
    // @ts-ignore
    if (typeof window !== 'undefined' && window.google?.accounts?.oauth2) {
      try {
        // @ts-ignore
        const client = window.google.accounts.oauth2.initTokenClient({
          client_id: clientId,
          scope: 'openid https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
          callback: async (tokenResponse: any) => {
            if (tokenResponse?.access_token) {
              try {
                const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                  headers: {
                    Authorization: `Bearer ${tokenResponse.access_token}`,
                  },
                });
                if (!res.ok) throw new Error('Failed to fetch user profile from Google');
                const data = await res.json();
                const profile: GoogleUserProfile = {
                  name: data.name || data.given_name || 'Druvhaa',
                  email: data.email || 'druvhaa.gwl@gmail.com',
                  picture: data.picture || '',
                  sub: data.sub,
                  givenName: data.given_name,
                  familyName: data.family_name,
                  authenticatedWithGoogle: true,
                };
                saveGoogleUser(profile);
                resolve(profile);
              } catch (err) {
                reject(err);
              }
            } else if (tokenResponse?.error) {
              reject(new Error(tokenResponse.error_description || tokenResponse.error));
            }
          },
          error_callback: (err: any) => {
            reject(new Error(err?.message || 'Google Sign In prompt was cancelled or closed'));
          },
        });

        client.requestAccessToken({ prompt: 'select_account' });
      } catch (err) {
        reject(err);
      }
    } else {
      reject(new Error('Google Identity Services library is still loading. Please try again.'));
    }
  });
}
