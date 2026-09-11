import type { ServiceCategory } from '../types/domain';

export const CATEGORIES: ServiceCategory[] = [
  { id: 'plumber', labelFr: 'Plomberie', icon: 'wrench' },
  { id: 'electrician', labelFr: 'Électricité', icon: 'zap' },
  { id: 'carpenter', labelFr: 'Menuiserie', icon: 'hammer' },
  { id: 'welder', labelFr: 'Soudure', icon: 'flame' },
  { id: 'mason', labelFr: 'Maçonnerie', icon: 'building' },
  { id: 'painter', labelFr: 'Peinture', icon: 'paintbrush' },
  { id: 'tailor', labelFr: 'Couture', icon: 'scissors' },
  { id: 'hairdresser', labelFr: 'Coiffure', icon: 'brush' },
  { id: 'cleaning', labelFr: 'Ménage', icon: 'sparkles' },
  { id: 'tutor', labelFr: 'Cours particuliers', icon: 'graduation-cap' },
  { id: 'developer', labelFr: 'Développement', icon: 'code' },
  { id: 'photographer', labelFr: 'Photographie', icon: 'camera' },
];

export function getCategory(id: string | null): ServiceCategory | undefined {
  return CATEGORIES.find((c) => c.id === id);
}
