export type LanguageCode = 'fr' | 'en' | 'ha' | 'ar';

export interface LanguageMeta {
  code: LanguageCode;
  label: string;
  nativeLabel: string;
  dir: 'ltr' | 'rtl';
}

/**
 * Langues actives dans le sélecteur.
 * Le zarma (dje) est scaffoldé dans /locales/dje mais pas encore
 * activé ici : voir /locales/dje/NOTES.md.
 */
export const SUPPORTED_LANGUAGES: LanguageMeta[] = [
  { code: 'fr', label: 'French', nativeLabel: 'Français', dir: 'ltr' },
  { code: 'en', label: 'English', nativeLabel: 'English', dir: 'ltr' },
  { code: 'ha', label: 'Hausa', nativeLabel: 'Hausa', dir: 'ltr' },
  { code: 'ar', label: 'Arabic', nativeLabel: 'العربية', dir: 'rtl' },
];

export const DEFAULT_LANGUAGE: LanguageCode = 'fr';

export function getLanguageMeta(code: string): LanguageMeta {
  return (
    SUPPORTED_LANGUAGES.find((lang) => lang.code === code) ??
    SUPPORTED_LANGUAGES.find((lang) => lang.code === DEFAULT_LANGUAGE)!
  );
}
