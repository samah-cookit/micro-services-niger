import {
  Wrench,
  Zap,
  Hammer,
  Flame,
  Building,
  Paintbrush,
  Scissors,
  Brush,
  Sparkles,
  GraduationCap,
  Code,
  Camera,
  type LucideIcon,
} from 'lucide-react';

const ICONS: Record<string, LucideIcon> = {
  wrench: Wrench,
  zap: Zap,
  hammer: Hammer,
  flame: Flame,
  building: Building,
  paintbrush: Paintbrush,
  scissors: Scissors,
  brush: Brush,
  sparkles: Sparkles,
  'graduation-cap': GraduationCap,
  code: Code,
  camera: Camera,
};

export function CategoryIcon({
  icon,
  size = 20,
}: {
  icon: string;
  size?: number;
}) {
  const Icon = ICONS[icon] ?? Wrench;
  return <Icon size={size} aria-hidden="true" />;
}
