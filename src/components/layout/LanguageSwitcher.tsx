import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { SUPPORTED_LANGUAGES } from '../../i18n/languages';
import styles from './LanguageSwitcher.module.css';

export function LanguageSwitcher() {
  const { i18n, t } = useTranslation();

  return (
    <label className={styles.wrapper}>
      <Globe size={16} aria-hidden="true" />
      <span className="sr-only">{t('language.label')}</span>
      <select
        className={styles.select}
        value={i18n.language}
        onChange={(event) => i18n.changeLanguage(event.target.value)}
        aria-label={t('language.label')}
      >
        {SUPPORTED_LANGUAGES.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.nativeLabel}
          </option>
        ))}
      </select>
    </label>
  );
}
