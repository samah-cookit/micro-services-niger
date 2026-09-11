import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Star } from 'lucide-react';
import { getCategory } from '../../data/categories';
import { getNeighborhood } from '../../data/neighborhoods';
import { getProvider } from '../../data/providers';
import { useRequestFlow } from '../../features/requester/RequestFlowContext';
import { StepProgress } from '../../components/layout/StepProgress';
import { Badge } from '../../components/ui/Badge';
import page from '../../styles/page.module.css';
import styles from './MatchesPage.module.css';

export function MatchesPage() {
  const navigate = useNavigate();
  const { request } = useRequestFlow();
  const category = getCategory(request.categoryId);
  const neighborhood = getNeighborhood(request.neighborhoodId);

  if (!category || request.matchedProviderIds.length === 0) {
    navigate('/request');
    return null;
  }

  const providers = request.matchedProviderIds
    .map((id) => getProvider(id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <div className={page.page}>
      <a href="/request/new" className={page.backLink} onClick={(e) => { e.preventDefault(); navigate('/request/new'); }}>
        <ArrowLeft size={16} aria-hidden="true" /> Modifier la demande
      </a>
      <StepProgress current={3} total={4} />
      <div>
        <h1 className={page.title}>{providers.length} prestataires trouvés</h1>
        <p className={page.subtitle}>
          {category.labelFr} · {neighborhood?.name ?? 'Niamey'}
        </p>
      </div>

      <ul className={styles.list}>
        {providers.map((provider, index) => (
          <li key={provider.id}>
            <button
              type="button"
              className={styles.card}
              onClick={() => navigate(`/providers/${provider.id}`)}
            >
              <div className={styles.avatar} aria-hidden="true">
                {provider.name.split(' ').map((p) => p[0]).slice(0, 2).join('')}
              </div>
              <div className={styles.info}>
                <div className={styles.nameRow}>
                  <span className={styles.name}>{provider.name}</span>
                  {index === 0 && <Badge tone="brand">Meilleure correspondance</Badge>}
                </div>
                <div className={styles.meta}>
                  <span className={styles.rating}>
                    <Star size={14} fill="currentColor" aria-hidden="true" />
                    {provider.rating.toFixed(1)} ({provider.reviewCount})
                  </span>
                  <span className={styles.distance}>
                    <MapPin size={14} aria-hidden="true" />
                    à environ {provider.distanceKm.toFixed(1)} km
                  </span>
                </div>
                <div className={styles.badges}>
                  {provider.availableNow ? (
                    <Badge tone="success">Disponible maintenant</Badge>
                  ) : (
                    <Badge tone="neutral">Répond sous {provider.responseRateMinutes} min</Badge>
                  )}
                  {provider.phoneVerified && <Badge tone="info">Téléphone vérifié</Badge>}
                </div>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
