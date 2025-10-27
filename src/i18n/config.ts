export const locales = ['en', 'nl', 'default'] as const;
export type Locale = typeof locales[number];

export const defaultLocale: Locale = 'en';

export function resolveLocale(input?: string | null): Locale {
    const value = (input || '').toLowerCase();
    return (locales as readonly string[]).includes(value) ? (value as Locale) : defaultLocale;
}

export async function getMessages(locale: Locale) {
    switch (locale) {
        case 'nl':
            return (await import('./locales/nl.json')).default;
        case 'default':
            return (await import('./locales/default.json')).default;
        case 'en':
        default:
            return (await import('./locales/en.json')).default;
    }
}
