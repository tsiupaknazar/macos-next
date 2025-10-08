export const locales = ['en', 'ua'] as const;
export type Locale = (typeof locales)[number];

export async function getMessages(locale: Locale) {
  return (await import(`@/data/messages/${locale}.json`)).default;
}
