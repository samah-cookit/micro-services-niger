import { useNavigate } from 'react-router-dom';
import { Star } from 'lucide-react';
import { getCategory } from '../../data/categories';
import { getProvider } from '../../data/providers';
import { useRequestFlow } from '../../features/requester/RequestFlowContext';
import { CategoryIcon } from '../../components/ui/CategoryIcon';
import page from '../../styles/page.module.css';
import styles from './HistoryPage.module.css';

export function HistoryPage() {
  const navigate = useNavigate();
  const { history } = useRequestFlow();

  return (
    <div className={page.page}>
      <div>
        <h1 className={page.title}>Historique</h1>
        <p className={page.subtitle}>Vos demandes passées.</p>
      </div>

      {history.length === 0 ? (
        <p className={page.subtitle}>Aucune demande pour l'instant.</p>
      ) : (
        <ul className={styles.list}>
          {history.map((entry) => {
            const category = getCategory(entry.categoryId);
            const provider = getProvider(entry.providerId);
            if (!category || !provider) return null;
            return (
              <li key={entry.id} className={styles.item}>
                <div className={styles.iconWrap}>
                  <CategoryIcon icon={category.icon} size={18} />
                </div>
                <div className={styles.info}>
                  <span className={styles.title}>{category.labelFr} — {provider.name}</span>
                  <span className={styles.date}>{entry.completedOn}</span>
                </div>
                {entry.rating && (
                  <span className={styles.rating}>
                    <Star size={14} fill="currentColor" aria-hidden="true" />
                    {entry.rating}
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      )}

      <button type="button" className={styles.newRequest} onClick={() => navigate('/request')}>
        + Nouvelle demande
      </button>
    </div>
  );
}
