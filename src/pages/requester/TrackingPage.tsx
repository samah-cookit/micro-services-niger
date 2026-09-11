import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Truck, CheckCircle2, PhoneCall } from 'lucide-react';
import { getProvider } from '../../data/providers';
import { useRequestFlow } from '../../features/requester/RequestFlowContext';
import { Button } from '../../components/ui/Button';
import page from '../../styles/page.module.css';
import styles from './TrackingPage.module.css';

export function TrackingPage() {
  const navigate = useNavigate();
  const { request, setStatus, setEta } = useRequestFlow();
  const provider = getProvider(request.selectedProviderId);
  const [eta, setLocalEta] = useState(request.etaMinutes ?? 12);

  useEffect(() => {
    if (request.status !== 'confirmed' && request.status !== 'en_route') return;
    if (eta <= 0) {
      setStatus('arrived');
      return;
    }
    setStatus('en_route');
    const timer = window.setTimeout(() => {
      setLocalEta((prev) => {
        const next = Math.max(0, prev - 3);
        setEta(next);
        return next;
      });
    }, 1200);
    return () => window.clearTimeout(timer);
  }, [eta, request.status, setStatus, setEta]);

  if (!provider) {
    navigate('/matches');
    return null;
  }

  const arrived = request.status === 'arrived' || eta <= 0;

  function handleComplete() {
    setStatus('completed');
    navigate('/review');
  }

  return (
    <div className={page.page}>
      <h1 className={page.title}>
        {arrived ? 'Le prestataire est arrivé' : 'Prestataire en route'}
      </h1>

      <div className={styles.statusCard}>
        <div className={styles.iconWrap}>
          {arrived ? (
            <CheckCircle2 size={28} aria-hidden="true" />
          ) : (
            <Truck size={28} aria-hidden="true" />
          )}
        </div>
        <div>
          <p className={styles.statusText}>
            {arrived
              ? `${provider.name} est arrivé à votre repère.`
              : `Arrivée estimée dans ${eta} min`}
          </p>
          <p className={styles.statusSub}>{provider.name} · {provider.landmark}</p>
        </div>
      </div>

      {!arrived && (
        <div className={styles.progressTrack}>
          <div
            className={styles.progressFill}
            style={{ width: `${100 - (eta / (request.etaMinutes || 12)) * 100}%` }}
          />
        </div>
      )}

      <a className={styles.callLink} href="tel:+22790000000">
        <PhoneCall size={16} aria-hidden="true" /> Appeler pour préciser le lieu
      </a>

      {arrived && (
        <Button size="lg" fullWidth onClick={handleComplete}>
          Marquer la prestation comme terminée
        </Button>
      )}
    </div>
  );
}
