import type { MatchScoreBreakdown, Provider } from '../../types/domain';

/**
 * Score_i = w1×Adéquation + w2×Proximité + w3×Disponibilité
 *         + w4×Fiabilité + w5×Réputation
 *
 * Simulation frontend uniquement — les prestataires sont déjà filtrés par
 * catégorie avant l'appel, donc l'adéquation est fixe ici. Les poids et
 * seuils sont des choix de démonstration, pas des valeurs mesurées.
 */
const WEIGHTS = {
  fit: 0.15,
  proximity: 0.3,
  availability: 0.2,
  reliability: 0.15,
  reputation: 0.2,
};

function scoreProvider(provider: Provider): MatchScoreBreakdown {
  const fit = 1;
  const proximity = Math.max(0, 1 - provider.distanceKm / 10);
  const availability = provider.availableNow ? 1 : 0.4;
  const reliability = 1 - Math.min(provider.responseRateMinutes, 60) / 60;
  const reputation =
    provider.rating / 5 - Math.max(0, (20 - provider.reviewCount) / 200);

  const score =
    WEIGHTS.fit * fit +
    WEIGHTS.proximity * proximity +
    WEIGHTS.availability * availability +
    WEIGHTS.reliability * reliability +
    WEIGHTS.reputation * reputation;

  return {
    providerId: provider.id,
    score: Math.round(score * 100),
    fit: Math.round(fit * 100),
    proximity: Math.round(proximity * 100),
    availability: Math.round(availability * 100),
    reliability: Math.round(reliability * 100),
    reputation: Math.round(Math.max(0, reputation) * 100),
  };
}

export function rankProviders(providers: Provider[]): MatchScoreBreakdown[] {
  return providers
    .map(scoreProvider)
    .sort((a, b) => b.score - a.score);
}
