import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Badge } from '../../components/ui/Badge';
import page from '../../styles/page.module.css';
import styles from './ProviderMessagesPage.module.css';

interface ConversationPreview {
  id: string;
  requesterName: string;
  lastMessage: string;
  time: string;
  unread: boolean;
}

// Données provisoires — à remplacer par les vraies conversations du prestataire.
const MOCK_CONVERSATIONS: ConversationPreview[] = [
  {
    id: '1',
    requesterName: 'Fatima Souley',
    lastMessage: 'Bonjour, êtes-vous disponible demain matin ?',
    time: '09:24',
    unread: true,
  },
  {
    id: '2',
    requesterName: 'Ibrahim Moussa',
    lastMessage: "D'accord, merci pour votre passage.",
    time: 'Hier',
    unread: false,
  },
  {
    id: '3',
    requesterName: 'Aïcha Boubacar',
    lastMessage: 'Combien ça coûterait pour réparer la fuite ?',
    time: 'Lun',
    unread: true,
  },
];

function getInitials(name: string) {
  return name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('');
}

export default function ProviderMessagesPage() {
  const navigate = useNavigate();

  function handleOpenConversation(id: string) {
    navigate(`/provider/messages/${id}`);
  }

  return (
    <div className={page.page}>
      <a
        href="/provider"
        className={page.backLink}
        onClick={(e) => {
          e.preventDefault();
          navigate(-1);
        }}
      >
        <ArrowLeft size={16} aria-hidden="true" /> Retour
      </a>

      <h1 className={page.title}>Messages reçus</h1>

      {MOCK_CONVERSATIONS.length === 0 ? (
        <p className={page.subtitle}>Aucun message pour le moment.</p>
      ) : (
        <ul className={styles.list}>
          {MOCK_CONVERSATIONS.map((conversation) => (
            <li key={conversation.id}>
              <button
                type="button"
                className={styles.item}
                onClick={() => handleOpenConversation(conversation.id)}
              >
                <div className={styles.avatar} aria-hidden="true">
                  {getInitials(conversation.requesterName)}
                </div>
                <div className={styles.content}>
                  <div className={styles.topRow}>
                    <span className={styles.name}>{conversation.requesterName}</span>
                    <span className={styles.time}>{conversation.time}</span>
                  </div>
                  <p className={styles.snippet}>{conversation.lastMessage}</p>
                </div>
                {conversation.unread && <Badge tone="brand">Nouveau</Badge>}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
