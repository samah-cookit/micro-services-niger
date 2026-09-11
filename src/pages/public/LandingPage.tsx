import { useTranslation } from 'react-i18next';
import { Wrench, Zap, Scissors, GraduationCap, ArrowRight } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import styles from './LandingPage.module.css';

const CATEGORIES = [
  { icon: Wrench, key: 'plumber', fr: 'Plomberie' },
  { icon: Zap, key: 'electrician', fr: 'Électricité' },
  { icon: Scissors, key: 'tailor', fr: 'Couture' },
  { icon: GraduationCap, key: 'tutor', fr: 'Cours particuliers' },
];

export function LandingPage() {
  const { t } = useTranslation();

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <h1 className={styles.headline}>{t('landing.eyebrowless_headline')}</h1>
        <p className={styles.subline}>{t('landing.subline')}</p>

        <div className={styles.roleCards}>
          <article className={styles.roleCard}>
            <h2>{t('role.requester')}</h2>
            <p>Décrivez votre besoin, précisez votre quartier, et comparez les prestataires disponibles près de vous.</p>
            <Button size="lg" icon={<ArrowRight size={18} aria-hidden="true" />}>
              {t('landing.cta_requester')}
            </Button>
          </article>
          <article className={styles.roleCard}>
            <h2>{t('role.provider')}</h2>
            <p>Créez votre profil, indiquez vos disponibilités, et recevez des demandes de personnes proches de vous.</p>
            <Button size="lg" variant="secondary" icon={<ArrowRight size={18} aria-hidden="true" />}>
              {t('landing.cta_provider')}
            </Button>
          </article>
        </div>
      </section>

      <section className={styles.categories} aria-label="Catégories de services">
        {CATEGORIES.map(({ icon: Icon, key, fr }) => (
          <div key={key} className={styles.category}>
            <Icon size={20} aria-hidden="true" />
            <span>{fr}</span>
          </div>
        ))}
      </section>

      <section className={styles.trustRow} aria-label="Confiance">
        <Badge tone="success">{t('trust.phone_verified')}</Badge>
        <Badge tone="brand">{t('trust.profile_confirmed')}</Badge>
        <Badge tone="neutral">{t('trust.responsive')}</Badge>
        <span className={styles.demoNote}>{t('common.demo_badge')}</span>
      </section>
    </div>
  );
}
