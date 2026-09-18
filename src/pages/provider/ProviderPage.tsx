import { useNavigate } from 'react-router-dom';
import { User, Search, MessageSquare, Star } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { getProvider } from '../../data/providers';
import { getCategory } from '../../data/categories';
import page from '../../styles/page.module.css';
import styles from './ProviderPage.module.css';

// Provisoire : en attendant l'authentification, on affiche ce prestataire
// comme étant "le compte connecté".
const CURRENT_PROVIDER_ID = 'p-rabiou-garba';

function getInitials(name: string) {
  return name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('');
}

export default function ProviderPage() {
  const navigate = useNavigate();
  const provider = getProvider(CURRENT_PROVIDER_ID);

  if (!provider) {
    return (
      <div className={page.page}>
        <p>Prestataire introuvable.</p>
      </div>
    );
  }

  const category = getCategory(provider.categoryId);

  function handleViewProfile() {
    navigate('/provider/profile');
  }

  function handleSearch() {
    navigate('/provider/search');
  }

  function handleMessages() {
    navigate('/provider/messages');
  }

  return (
    <div className={page.page}>
      <div className={styles.topSection}>
        <div className={styles.photoColumn}>
          <div className={styles.avatar} aria-hidden="true">
            {getInitials(provider.name)}
          </div>
        </div>
        <div className={styles.infoColumn}>
          <h1 className={styles.name}>{provider.name}</h1>
          <p className={styles.profession}>{category?.labelFr ?? 'Métier non renseigné'}</p>
          <div className={styles.ratingRow}>
            <Star size={16} fill="currentColor" aria-hidden="true" />
            <span>{provider.rating.toFixed(1)} ({provider.reviewCount} avis)</span>
          </div>
        </div>
        
      </div>

      <div className={styles.bottomSection}>
        <Button size="lg" fullWidth onClick={handleViewProfile}>
          <User size={16} aria-hidden="true" /> Voir mon profil
        </Button>
        <Button size="lg" fullWidth variant="secondary" onClick={handleSearch}>
          <Search size={16} aria-hidden="true" /> Rechercher
        </Button>
        <Button size="lg" fullWidth variant="secondary" onClick={handleMessages}>
          <MessageSquare size={16} aria-hidden="true" /> Messages reçus
        </Button>
      </div>
    </div>
  );
}
