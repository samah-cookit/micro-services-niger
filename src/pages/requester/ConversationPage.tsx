import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Send } from 'lucide-react';
import { getProvider } from '../../data/providers';
import { getNeighborhood } from '../../data/neighborhoods';
import { useRequestFlow } from '../../features/requester/RequestFlowContext';
import { Button } from '../../components/ui/Button';
import page from '../../styles/page.module.css';
import styles from './ConversationPage.module.css';

interface Message {
  id: string;
  from: 'provider' | 'me';
  text: string;
}

export function ConversationPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { request, setStatus } = useRequestFlow();
  const provider = getProvider(id ?? null);
  const neighborhood = getNeighborhood(request.neighborhoodId);

  const [messages, setMessages] = useState<Message[]>(() =>
    provider
      ? [
          {
            id: 'm1',
            from: 'provider',
            text: `Bonjour, je suis ${provider.name.split(' ')[0]}. J'ai bien reçu votre demande pour ${neighborhood?.name ?? 'votre quartier'}. Vous êtes disponible aujourd'hui ?`,
          },
        ]
      : [],
  );
  const [draft, setDraft] = useState('');
  const [agreed, setAgreed] = useState(false);

  if (!provider) {
    navigate('/matches');
    return null;
  }

  function sendMessage() {
    if (!draft.trim()) return;
    const mine: Message = { id: `me-${Date.now()}`, from: 'me', text: draft.trim() };
    setMessages((prev) => [...prev, mine]);
    setDraft('');
    setStatus('contacted');

    // Réponse simulée du prestataire, pour rendre la conversation crédible.
    window.setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `p-${Date.now()}`,
          from: 'provider',
          text: "Très bien, je peux passer aujourd'hui. On se met d'accord sur le prix sur place selon le travail à faire.",
        },
      ]);
      setAgreed(true);
    }, 1000);
  }

  function handleConfirm() {
    navigate('/request/confirm');
  }

  return (
    <div className={page.page}>
      <a href={`/providers/${provider.id}`} className={page.backLink} onClick={(e) => { e.preventDefault(); navigate(-1); }}>
        <ArrowLeft size={16} aria-hidden="true" /> {provider.name}
      </a>

      <div className={styles.thread}>
        {messages.map((m) => (
          <div key={m.id} className={`${styles.bubble} ${m.from === 'me' ? styles.mine : styles.theirs}`}>
            {m.text}
          </div>
        ))}
      </div>

      <div className={styles.composer}>
        <input
          type="text"
          placeholder="Écrire un message…"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button type="button" className={styles.sendButton} onClick={sendMessage} aria-label="Envoyer">
          <Send size={18} aria-hidden="true" />
        </button>
      </div>

      {agreed && (
        <div className={styles.stickyFooter}>
          <Button size="lg" fullWidth onClick={handleConfirm}>
            Nous sommes d'accord — confirmer
          </Button>
        </div>
      )}
    </div>
  );
}
