export interface ServiceCategory {
  id: string;
  labelFr: string;
  icon: string; // clé lucide-react, résolue dans components/ui/CategoryIcon
}

export interface Neighborhood {
  id: string;
  name: string;
  city: string;
}

export interface Provider {
  id: string;
  name: string;
  categoryId: string;
  neighborhoodId: string;
  rating: number; // 0-5
  reviewCount: number;
  distanceKm: number;
  responseRateMinutes: number;
  completedJobs: number;
  phoneVerified: boolean;
  profileConfirmed: boolean;
  availableNow: boolean;
  priceRangeFcfa: [number, number];
  bio: string;
  landmark: string;
}

export interface Review {
  id: string;
  providerId: string;
  authorInitials: string;
  rating: number;
  comment: string;
  daysAgo: number;
}

export type RequestStatus =
  | 'draft'
  | 'matching'
  | 'matched'
  | 'contacted'
  | 'confirmed'
  | 'en_route'
  | 'arrived'
  | 'completed'
  | 'reviewed';

export interface ServiceRequestState {
  status: RequestStatus;
  categoryId: string | null;
  neighborhoodId: string | null;
  landmark: string;
  description: string;
  selectedProviderId: string | null;
  matchedProviderIds: string[];
  etaMinutes: number | null;
  createdAt: string | null;
}

export interface MatchScoreBreakdown {
  providerId: string;
  score: number;
  fit: number;
  proximity: number;
  availability: number;
  reliability: number;
  reputation: number;
}

export interface HistoryEntry {
  id: string;
  categoryId: string;
  providerId: string;
  completedOn: string;
  rating: number | null;
}
