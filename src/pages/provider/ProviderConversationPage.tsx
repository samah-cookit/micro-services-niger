import { useState, type FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Send } from 'lucide-react';
import page from '../../styles/page.module.css';
import styles from './ProviderConversationPage.module.css';

interface Message {
  id: string;
  sender: 'provider' | 'requester';
  text: string;
  time: string;
}

// Données provisoires — à remplacer par les vraies conversations du prestataire.
const MOCK_THREADS: Record<string, { requesterName: string; messages: Message[] }> = {
  '1': {
    requesterName: 'Fatima Souley',
    messages: [
      { id: 'm1', sender: 'requester', text: 'Bonjour, êtes-vous disponible demain matin ?', time: '09:20' },
      { id: 'm2', sender: 'provider', text: 'Bonjour, oui je peux passer vers 9h.', time: '09:22' },
      { id: 'm3', sender: 'requester', text: 'Parfait, merci !', time: '09:24' },
    ],
  },
  '2': {
    requesterName: 'Ibrahim Moussa',
    messages: [
      { id: 'm1', sender: 'provider', text: 'Le travail est terminé, tout fonctionne.', time: 'Hier 15:00' },
      { id: 'm2', sender: 'requester', text: "D'accord, merci pour votre passage.", time: 'Hier 15:10' },
    ],
  },
  '3': {
    requesterName: 'Aïcha Boubacar',
    messages: [
      { id: 'm1', sender: 'requester', text: 'Combien ça coûterait pour réparer la fuite ?', time: 'Lun 11:00' },
    ],
  },
};

export default function ProviderConversationPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const thread = id ? MOCK_THREADS[id] : undefined;

  const [messages, setMessages] = useState<Message[]>(thread?.messages ?? []);
  const [draft, setDraft] = useState('');

  if (!thread) {
    return (
      <div className={page.page}>
        <p>Conversation introuvable.</p>
      </div>
    );
  }

  function handleSend(e: FormEvent) {
    e.preventDefault();
    const text = draft.trim();
    if (text.length === 0) return;

    const newMessage: Message = {
      id: `m${Date.now()}`,
      sender: 'provider',
      text,
      time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages((prev) => [...prev, newMessage]);
    setDraft('');
  }

  return (
    <div className={page.page}>
      <a
        href="/provider/messages"
        className={page.backLink}
        onClick={(e) => {
          e.preventDefault();
          navigate(-1);
        }}
      >
        <ArrowLeft size={16} aria-hidden="true" /> Retour aux messages
      </a>

      <h1 className={page.title}>{thread.requesterName}</h1>

      <div className={styles.thread}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={
              message.sender === 'provider'
                ? styles.bubbleRowRight
                : styles.bubbleRowLeft
            }
          >
            <div
              className={
                message.sender === 'provider'
                  ? styles.bubbleProvider
                  : styles.bubbleRequester
              }
            >
              <p className={styles.bubbleText}>{message.text}</p>
              <span className={styles.bubbleTime}>{message.time}</span>
            </div>
          </div>
        ))}
      </div>

      <form className={styles.composer} onSubmit={handleSend}>
        <input
          type="text"
          className={styles.input}
          placeholder="Écrire un message..."
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
        />
        <button type="submit" className={styles.sendButton} aria-label="Envoyer">
          <Send size={18} aria-hidden="true" />
        </button>
      </form>
    </div>
  );
}
