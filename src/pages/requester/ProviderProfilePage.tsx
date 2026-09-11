import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Star, MapPin, ShieldCheck, Clock, Phone } from 'lucide-react';
import { getProvider, getReviewsForProvider } from '../../data/providers';
import { getCategory } from '../../data/categories';
import { getNeighborhood } from '../../data/neighborhoods';
import { useRequestFlow } from '../../features/requester/RequestFlowContext';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import page from '../../styles/page.module.css';
import styles from './ProviderProfilePage.module.css';

export function ProviderProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { selectProvider } = useRequestFlow();
  const provider = getProvider(id ?? null);

  if (!provider) {
    return (
      <div className={page.page}>
        <p>Prestataire introuvable.</p>
      </div>
    );
  }

  const category = getCategory(provider.categoryId);
  const neighborhood = getNeighborhood(provider.neighborhoodId);
  const reviews = getReviewsForProvider(provider.id);

  function handleContact() {
    selectProvider(provider!.id);
    navigate(`/providers/${provider!.id}/contact`);
  }

  return (
    <div className={page.page}>
      <a href="/matches" className={page.backLink} onClick={(e) => { e.preventDefault(); navigate(-1); }}>
        <ArrowLeft size={16} aria-hidden="true" /> Retour aux résultats
      </a>

      <div className={styles.header}>
        <div className={styles.avatar} aria-hidden="true">
          {provider.name.split(' ').map((p) => p[0]).slice(0, 2).join('')}
        </div>
        <div>
          <h1 className={page.title}>{provider.name}</h1>
          <p className={page.subtitle}>
            {category?.labelFr} · {neighborhood?.name}
          </p>
          <div className={styles.ratingRow}>
            <Star size={16} fill="currentColor" aria-hidden="true" />
            <span>{provider.rating.toFixed(1)} ({provider.reviewCount} avis)</span>
          </div>
        </div>
      </div>

      <div className={styles.badges}>
        {provider.phoneVerified && (
          <Badge tone="info"><ShieldCheck size={12} aria-hidden="true" /> Téléphone vérifié</Badge>
        )}
        {provider.profileConfirmed && <Badge tone="brand">Profil confirmé</Badge>}
        {provider.responseRateMinutes <= 10 && <Badge tone="success">Très réactif</Badge>}
        {provider.completedJobs > 100 && <Badge tone="neutral">Prestataire fiable</Badge>}
      </div>

      <p className={styles.bio}>{provider.bio}</p>

      <dl className={styles.factList}>
        <div>
          <dt><MapPin size={14} aria-hidden="true" /> Localisation</dt>
          <dd>{provider.landmark} — à environ {provider.distanceKm.toFixed(1)} km</dd>
        </div>
        <div>
          <dt><Clock size={14} aria-hidden="true" /> Temps de réponse habituel</dt>
          <dd>{provider.responseRateMinutes} minutes</dd>
        </div>
        <div>
          <dt><Phone size={14} aria-hidden="true" /> Tarif indicatif</dt>
          <dd>{provider.priceRangeFcfa[0].toLocaleString('fr-FR')} – {provider.priceRangeFcfa[1].toLocaleString('fr-FR')} FCFA</dd>
        </div>
      </dl>

      {reviews.length > 0 && (
        <section className={styles.reviews}>
          <h2 className={styles.reviewsTitle}>Avis récents</h2>
          <ul>
            {reviews.map((r) => (
              <li key={r.id} className={styles.review}>
                <div className={styles.reviewHead}>
                  <span className={styles.reviewAuthor}>{r.authorInitials}</span>
                  <span className={styles.reviewStars}>
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star
                        key={i}
                        size={12}
                        fill={i < r.rating ? 'currentColor' : 'none'}
                        aria-hidden="true"
                      />
                    ))}
                  </span>
                  <span className={styles.reviewDate}>il y a {r.daysAgo} j</span>
                </div>
                <p>{r.comment}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className={styles.stickyFooter}>
        <Button size="lg" fullWidth onClick={handleContact}>
          Contacter {provider.name.split(' ')[0]}
        </Button>
      </div>
    </div>
  );
}
