import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star } from 'lucide-react';
import { getProvider } from '../../data/providers';
import { useRequestFlow } from '../../features/requester/RequestFlowContext';
import { Button } from '../../components/ui/Button';
import page from '../../styles/page.module.css';
import styles from './ReviewPage.module.css';

export function ReviewPage() {
  const navigate = useNavigate();
  const { request, completeWithReview, resetRequest } = useRequestFlow();
  const provider = getProvider(request.selectedProviderId);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!provider) {
    navigate('/');
    return null;
  }

  function handleSubmit() {
    completeWithReview(rating);
    setSubmitted(true);
  }

  function handleDone() {
    resetRequest();
    navigate('/history');
  }

  if (submitted) {
    return (
      <div className={page.page}>
        <h1 className={page.title}>Merci pour votre évaluation</h1>
        <p className={page.subtitle}>
          Votre avis aide les autres personnes à choisir un prestataire fiable.
        </p>
        <Button size="lg" onClick={handleDone}>Voir mon historique</Button>
      </div>
    );
  }

  return (
    <div className={page.page}>
      <h1 className={page.title}>Comment s'est passée la prestation ?</h1>
      <p className={page.subtitle}>Avec {provider.name}</p>

      <div className={styles.stars} role="radiogroup" aria-label="Note">
        {Array.from({ length: 5 }, (_, i) => {
          const value = i + 1;
          return (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={rating === value}
              aria-label={`${value} étoile${value > 1 ? 's' : ''}`}
              className={styles.starButton}
              onClick={() => setRating(value)}
            >
              <Star size={32} fill={value <= rating ? 'currentColor' : 'none'} aria-hidden="true" />
            </button>
          );
        })}
      </div>

      <label className={styles.field}>
        <span>Un commentaire (optionnel)</span>
        <textarea
          rows={3}
          placeholder="Qu'est-ce qui s'est bien passé ?"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </label>

      <Button size="lg" fullWidth disabled={rating === 0} onClick={handleSubmit}>
        Envoyer l'évaluation
      </Button>
    </div>
  );
}
