import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { HistoryEntry, RequestStatus, ServiceRequestState } from '../../types/domain';

const initialRequest: ServiceRequestState = {
  status: 'draft',
  categoryId: null,
  neighborhoodId: null,
  landmark: '',
  description: '',
  selectedProviderId: null,
  matchedProviderIds: [],
  etaMinutes: null,
  createdAt: null,
};

// Historique de démonstration préexistant, pour que l'écran d'historique
// ne soit pas vide au premier lancement.
const SEED_HISTORY: HistoryEntry[] = [
  { id: 'h1', categoryId: 'electrician', providerId: 'p-rabiou-garba', completedOn: '2026-08-28', rating: 5 },
  { id: 'h2', categoryId: 'tailor', providerId: 'p-aichatou-moussa', completedOn: '2026-08-14', rating: 5 },
];

interface RequestFlowContextValue {
  request: ServiceRequestState;
  history: HistoryEntry[];
  setCategory: (categoryId: string) => void;
  setLocation: (neighborhoodId: string, landmark: string) => void;
  setDescription: (description: string) => void;
  runMatching: (matchedProviderIds: string[]) => void;
  selectProvider: (providerId: string) => void;
  setStatus: (status: RequestStatus) => void;
  setEta: (etaMinutes: number | null) => void;
  completeWithReview: (rating: number) => void;
  resetRequest: () => void;
}

const RequestFlowContext = createContext<RequestFlowContextValue | null>(null);

export function RequestFlowProvider({ children }: { children: ReactNode }) {
  const [request, setRequest] = useState<ServiceRequestState>(initialRequest);
  const [history, setHistory] = useState<HistoryEntry[]>(SEED_HISTORY);

  const setCategory = useCallback((categoryId: string) => {
    setRequest((prev) => ({ ...prev, categoryId, status: 'draft' }));
  }, []);

  const setLocation = useCallback((neighborhoodId: string, landmark: string) => {
    setRequest((prev) => ({ ...prev, neighborhoodId, landmark }));
  }, []);

  const setDescription = useCallback((description: string) => {
    setRequest((prev) => ({ ...prev, description }));
  }, []);

  const runMatching = useCallback((matchedProviderIds: string[]) => {
    setRequest((prev) => ({
      ...prev,
      matchedProviderIds,
      status: 'matched',
      createdAt: new Date().toISOString(),
    }));
  }, []);

  const selectProvider = useCallback((providerId: string) => {
    setRequest((prev) => ({ ...prev, selectedProviderId: providerId }));
  }, []);

  const setStatus = useCallback((status: RequestStatus) => {
    setRequest((prev) => ({ ...prev, status }));
  }, []);

  const setEta = useCallback((etaMinutes: number | null) => {
    setRequest((prev) => ({ ...prev, etaMinutes }));
  }, []);

  const completeWithReview = useCallback(
    (rating: number) => {
      setRequest((prev) => {
        if (prev.categoryId && prev.selectedProviderId) {
          setHistory((h) => [
            {
              id: `h-${Date.now()}`,
              categoryId: prev.categoryId!,
              providerId: prev.selectedProviderId!,
              completedOn: new Date().toISOString().slice(0, 10),
              rating,
            },
            ...h,
          ]);
        }
        return { ...prev, status: 'reviewed' };
      });
    },
    [],
  );

  const resetRequest = useCallback(() => {
    setRequest(initialRequest);
  }, []);

  const value = useMemo(
    () => ({
      request,
      history,
      setCategory,
      setLocation,
      setDescription,
      runMatching,
      selectProvider,
      setStatus,
      setEta,
      completeWithReview,
      resetRequest,
    }),
    [
      request,
      history,
      setCategory,
      setLocation,
      setDescription,
      runMatching,
      selectProvider,
      setStatus,
      setEta,
      completeWithReview,
      resetRequest,
    ],
  );

  return (
    <RequestFlowContext.Provider value={value}>
      {children}
    </RequestFlowContext.Provider>
  );
}

export function useRequestFlow(): RequestFlowContextValue {
  const ctx = useContext(RequestFlowContext);
  if (!ctx) {
    throw new Error('useRequestFlow must be used within a RequestFlowProvider');
  }
  return ctx;
}
