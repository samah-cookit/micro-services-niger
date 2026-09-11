import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowLeft } from 'lucide-react';
import { CATEGORIES } from '../../data/categories';
import { CategoryIcon } from '../../components/ui/CategoryIcon';
import { StepProgress } from '../../components/layout/StepProgress';
import { useRequestFlow } from '../../features/requester/RequestFlowContext';
import page from '../../styles/page.module.css';
import styles from './RequestCategoryPage.module.css';

export function RequestCategoryPage() {
  const navigate = useNavigate();
  const { setCategory } = useRequestFlow();
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return CATEGORIES;
    return CATEGORIES.filter((c) => c.labelFr.toLowerCase().includes(q));
  }, [query]);

  function handleSelect(categoryId: string) {
    setCategory(categoryId);
    navigate('/request/new');
  }

  return (
    <div className={page.page}>
      <a href="/" className={page.backLink}>
        <ArrowLeft size={16} aria-hidden="true" /> Accueil
      </a>
      <StepProgress current={1} total={4} />
      <div>
        <h1 className={page.title}>De quel service avez-vous besoin ?</h1>
        <p className={page.subtitle}>Choisissez une catégorie pour continuer.</p>
      </div>

      <div className={styles.searchBar}>
        <Search size={18} aria-hidden="true" />
        <input
          type="search"
          placeholder="Plombier, couturière, cours de maths…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Rechercher une catégorie"
        />
      </div>

      <div className={styles.grid}>
        {filtered.map((cat) => (
          <button
            key={cat.id}
            type="button"
            className={styles.card}
            onClick={() => handleSelect(cat.id)}
          >
            <CategoryIcon icon={cat.icon} size={22} />
            <span>{cat.labelFr}</span>
          </button>
        ))}
        {filtered.length === 0 && (
          <p className={page.subtitle}>Aucune catégorie ne correspond à « {query} ».</p>
        )}
      </div>
    </div>
  );
}
