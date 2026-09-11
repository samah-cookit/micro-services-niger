import { Link } from 'react-router-dom';

export function PlaceholderPage({ title }: { title: string }) {
  return (
    <div style={{ padding: 'var(--space-10) var(--space-5)' }}>
      <p style={{ color: 'var(--color-ink-tertiary)', fontSize: 'var(--font-size-sm)' }}>
        Écran à construire
      </p>
      <h1 style={{ marginTop: 'var(--space-2)' }}>{title}</h1>
      <Link to="/" style={{ color: 'var(--color-brand)', display: 'inline-block', marginTop: 'var(--space-4)' }}>
        ← Retour à l'accueil
      </Link>
    </div>
  );
}
