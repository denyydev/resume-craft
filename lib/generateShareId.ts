import { randomBytes } from "crypto";

/**
 * Генерирует крипто-рандомный shareId используя crypto.randomBytes
 * Кодируется в base64url для безопасного использования в URL
 * 
 * @param length - длина байтов (по умолчанию 18 = 24 символа base64url)
 * @returns безопасный случайный ID для публичной ссылки
 */
export function generateShareId(length: number = 18): string {
  const bytes = randomBytes(length);
  // Конвертируем в base64url (безопасный для URL)
  return bytes
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
}

