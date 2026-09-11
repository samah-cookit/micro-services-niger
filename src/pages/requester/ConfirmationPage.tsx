import { useNavigate } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { getProvider } from '../../data/providers';
import { getCategory } from '../../data/categories';
import { getNeighborhood } from '../../data/neighborhoods';
import { useRequestFlow } from '../../features/requester/RequestFlowContext';
import { Button } from '../../components/ui/Button';
import page from '../../styles/page.module.css';
import styles from './ConfirmationPage.module.css';

export function ConfirmationPage() {
  const navigate = useNavigate();
  const { request, setStatus, setEta } = useRequestFlow();
  const provider = getProvider(request.selectedProviderId);
  const category = getCategory(request.categoryId);
  const neighborhood = getNeighborhood(request.neighborhoodId);

  if (!provider || !category) {
    navigate('/matches');
    return null;
  }

  function handleConfirm() {
    setStatus('confirmed');
    setEta(12);
    navigate('/tracking');
  }

  return (
    <div className={page.page}>
      <div className={styles.icon}>
        <CheckCircle2 size={40} aria-hidden="true" />
      </div>
      <h1 className={page.title}>Récapitulatif de la demande</h1>
      <p className={page.subtitle}>Vérifiez les détails avant de confirmer.</p>

      <dl className={styles.summary}>
        <div><dt>Service</dt><dd>{category.labelFr}</dd></div>
        <div><dt>Prestataire</dt><dd>{provider.name}</dd></div>
        <div><dt>Localisation</dt><dd>{neighborhood?.name}{request.landmark ? ` — ${request.landmark}` : ''}</dd></div>
        {request.description && <div><dt>Description</dt><dd>{request.description}</dd></div>}
        <div><dt>Tarif indicatif</dt><dd>{provider.priceRangeFcfa[0].toLocaleString('fr-FR')} – {provider.priceRangeFcfa[1].toLocaleString('fr-FR')} FCFA</dd></div>
      </dl>

      <Button size="lg" fullWidth onClick={handleConfirm}>
        Confirmer le rendez-vous
      </Button>
    </div>
  );
}
