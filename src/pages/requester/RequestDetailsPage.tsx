import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin } from 'lucide-react';
import { NEIGHBORHOODS } from '../../data/neighborhoods';
import { getCategory } from '../../data/categories';
import { getProvidersByCategory } from '../../data/providers';
import { rankProviders } from '../../features/matching/scoring';
import { useRequestFlow } from '../../features/requester/RequestFlowContext';
import { StepProgress } from '../../components/layout/StepProgress';
import { Button } from '../../components/ui/Button';
import page from '../../styles/page.module.css';
import styles from './RequestDetailsPage.module.css';

export function RequestDetailsPage() {
  const navigate = useNavigate();
  const { request, setLocation, setDescription, runMatching, setStatus } =
    useRequestFlow();
  const category = getCategory(request.categoryId);

  const [neighborhoodId, setNeighborhoodId] = useState(request.neighborhoodId ?? '');
  const [landmark, setLandmark] = useState(request.landmark);
  const [description, setDescriptionValue] = useState(request.description);
  const [isSearching, setIsSearching] = useState(false);

  if (!category) {
    navigate('/request');
    return null;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!neighborhoodId) return;

    setLocation(neighborhoodId, landmark);
    setDescription(description);
    setStatus('matching');
    setIsSearching(true);

    // Simulation du calcul de matching — délai court pour rester crédible
    // sans ralentir la démonstration.
    window.setTimeout(() => {
      const candidates = getProvidersByCategory(category!.id);
      const ranked = rankProviders(candidates);
      runMatching(ranked.map((r) => r.providerId));
      navigate('/matches');
    }, 900);
  }

  return (
    <div className={page.page}>
      <a href="/request" className={page.backLink} onClick={(e) => { e.preventDefault(); navigate('/request'); }}>
        <ArrowLeft size={16} aria-hidden="true" /> Changer de catégorie
      </a>
      <StepProgress current={2} total={4} />
      <div>
        <h1 className={page.title}>{category.labelFr}</h1>
        <p className={page.subtitle}>Précisez votre localisation et votre besoin.</p>
      </div>

      {isSearching ? (
        <div className={styles.searching}>
          <div className={styles.spinner} aria-hidden="true" />
          <p>Recherche des prestataires disponibles près de vous…</p>
        </div>
      ) : (
        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.field}>
            <span>Quartier</span>
            <div className={styles.selectWrap}>
              <MapPin size={16} aria-hidden="true" />
              <select
                required
                value={neighborhoodId}
                onChange={(e) => setNeighborhoodId(e.target.value)}
              >
                <option value="" disabled>Sélectionnez un quartier</option>
                {NEIGHBORHOODS.map((n) => (
                  <option key={n.id} value={n.id}>{n.name}</option>
                ))}
              </select>
            </div>
          </label>

          <label className={styles.field}>
            <span>Repère (optionnel)</span>
            <input
              type="text"
              placeholder="Ex : près du marché, en face de la pharmacie…"
              value={landmark}
              onChange={(e) => setLandmark(e.target.value)}
            />
          </label>

          <label className={styles.field}>
            <span>Décrivez votre besoin</span>
            <textarea
              rows={4}
              placeholder="Ex : fuite d'eau sous l'évier de la cuisine"
              value={description}
              onChange={(e) => setDescriptionValue(e.target.value)}
            />
          </label>

          <Button type="submit" size="lg" disabled={!neighborhoodId} fullWidth>
            Trouver un prestataire
          </Button>
        </form>
      )}
    </div>
  );
}
