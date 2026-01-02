const GITHUB_DOMAIN = "github.com";
const TELEGRAM_DOMAINS = ["t.me", "telegram.me"];
const LINKEDIN_DOMAIN = "linkedin.com";

const USERNAME_PATTERN = /^[a-zA-Z0-9_-]+$/;
const LINKEDIN_USERNAME_PATTERN = /^[a-zA-Z0-9_-]+$/;

function isValidUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch {
    return false;
  }
}

function sanitizeUsername(username: string): string {
  return username.trim().replace(/^@/, "");
}

function isValidGithubUsername(username: string): boolean {
  const sanitized = sanitizeUsername(username);
  return USERNAME_PATTERN.test(sanitized) && sanitized.length > 0;
}

function isValidTelegramUsername(username: string): boolean {
  const sanitized = sanitizeUsername(username);
  return /^[a-zA-Z0-9_]+$/.test(sanitized) && sanitized.length > 0;
}

export function normalizeGithubLink(value?: string | null): string | null {
  if (!value || typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return null;
  }

  if (isValidUrl(trimmed)) {
    try {
      const url = new URL(trimmed);
      if (url.hostname === GITHUB_DOMAIN || url.hostname === `www.${GITHUB_DOMAIN}`) {
        const path = url.pathname.replace(/^\/+|\/+$/g, "");
        if (path && isValidGithubUsername(path.split("/")[0] || "")) {
          return `https://${GITHUB_DOMAIN}/${path.split("/")[0]}`;
        }
      }
    } catch {
      return null;
    }
    return null;
  }

  if (isValidGithubUsername(trimmed)) {
    return `https://${GITHUB_DOMAIN}/${sanitizeUsername(trimmed)}`;
  }

  return null;
}

export function normalizeTelegramLink(value?: string | null): string | null {
  if (!value || typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return null;
  }

  if (isValidUrl(trimmed)) {
    try {
      const url = new URL(trimmed);
      const hostname = url.hostname.replace(/^www\./, "");
      
      if (TELEGRAM_DOMAINS.includes(hostname)) {
        const path = url.pathname.replace(/^\/+|\/+$/g, "");
        if (path && isValidTelegramUsername(path)) {
          return `https://t.me/${path}`;
        }
      }
    } catch {
      return null;
    }
    return null;
  }

  if (isValidTelegramUsername(trimmed)) {
    return `https://t.me/${sanitizeUsername(trimmed)}`;
  }

  return null;
}

function isValidLinkedinUsername(username: string): boolean {
  const sanitized = sanitizeUsername(username);
  return LINKEDIN_USERNAME_PATTERN.test(sanitized) && sanitized.length > 0;
}

export function normalizeLinkedinLink(value?: string | null): string | null {
  if (!value || typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return null;
  }

  if (isValidUrl(trimmed)) {
    try {
      const url = new URL(trimmed);
      const hostname = url.hostname.replace(/^www\./, "");
      
      if (hostname === LINKEDIN_DOMAIN) {
        const path = url.pathname.replace(/^\/+|\/+$/g, "");
        const parts = path.split("/").filter(Boolean);
        
        if (parts[0] === "in" && parts[1] && isValidLinkedinUsername(parts[1])) {
          return `https://www.${LINKEDIN_DOMAIN}/in/${parts[1]}/`;
        }
      }
    } catch {
      return null;
    }
    return null;
  }

  if (isValidLinkedinUsername(trimmed)) {
    return `https://www.${LINKEDIN_DOMAIN}/in/${sanitizeUsername(trimmed)}/`;
  }

  return null;
}

export function normalizeGenericUrl(value?: string | null): string | null {
  if (!value || typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return null;
  }

  if (!isValidUrl(trimmed)) {
    return null;
  }

  try {
    const url = new URL(trimmed);
    if (url.protocol !== "https:" && url.protocol !== "http:") {
      return null;
    }
    
    const normalized = url.toString();
    if (normalized.length > 2048) {
      return null;
    }
    
    return normalized;
  } catch {
    return null;
  }
}

