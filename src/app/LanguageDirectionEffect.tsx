import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getLanguageMeta } from '../i18n/languages';

export function LanguageDirectionEffect() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const applyDirection = (lng: string) => {
      const meta = getLanguageMeta(lng);
      document.documentElement.lang = meta.code;
      document.documentElement.dir = meta.dir;
    };

    applyDirection(i18n.language);
    i18n.on('languageChanged', applyDirection);
    return () => {
      i18n.off('languageChanged', applyDirection);
    };
  }, [i18n]);

  return null;
}
