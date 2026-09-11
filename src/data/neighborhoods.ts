import type { Neighborhood } from '../types/domain';

// Données FICTIVES / DE DÉMONSTRATION — quartiers réels de Niamey utilisés
// comme repères, mais aucune donnée statistique réelle n'y est associée.
export const NEIGHBORHOODS: Neighborhood[] = [
  { id: 'yantala', name: 'Yantala', city: 'Niamey' },
  { id: 'plateau', name: 'Plateau', city: 'Niamey' },
  { id: 'lazaret', name: 'Lazaret', city: 'Niamey' },
  { id: 'koira-kano', name: 'Koira Kano', city: 'Niamey' },
  { id: 'talladje', name: 'Talladjé', city: 'Niamey' },
  { id: 'gamkalley', name: 'Gamkalley', city: 'Niamey' },
  { id: 'boukoki', name: 'Boukoki', city: 'Niamey' },
  { id: 'wadata', name: 'Wadata', city: 'Niamey' },
  { id: 'harobanda', name: 'Harobanda', city: 'Niamey' },
  { id: 'saga', name: 'Saga', city: 'Niamey' },
  { id: 'niamey-2000', name: 'Niamey 2000', city: 'Niamey' },
];

export function getNeighborhood(id: string | null): Neighborhood | undefined {
  return NEIGHBORHOODS.find((n) => n.id === id);
}
