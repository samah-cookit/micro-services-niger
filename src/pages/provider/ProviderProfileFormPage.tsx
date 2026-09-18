import { useState, type FormEvent, type KeyboardEvent } from 'react';
import { X, Plus, Pencil } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { getProvider } from '../../data/providers';
import { getNeighborhood } from '../../data/neighborhoods';
import page from '../../styles/page.module.css';
import styles from './ProviderProfileFormPage.module.css';

// Provisoire : en attendant l'authentification, on édite ce prestataire
// comme étant "le compte connecté" (même ID que dans ProviderPage).
const CURRENT_PROVIDER_ID = 'p-rabiou-garba';
const STORAGE_KEY = `provider-profile-${CURRENT_PROVIDER_ID}`;

type TimeSlot = 'matin' | 'apresMidi' | 'soir';

interface DayAvailability {
  matin: boolean;
  apresMidi: boolean;
  soir: boolean;
}

const DAYS = [
  { key: 'lundi', label: 'Lundi' },
  { key: 'mardi', label: 'Mardi' },
  { key: 'mercredi', label: 'Mercredi' },
  { key: 'jeudi', label: 'Jeudi' },
  { key: 'vendredi', label: 'Vendredi' },
  { key: 'samedi', label: 'Samedi' },
  { key: 'dimanche', label: 'Dimanche' },
] as const;

type DayKey = (typeof DAYS)[number]['key'];

type Availability = Record<DayKey, DayAvailability>;

const EMPTY_AVAILABILITY: Availability = DAYS.reduce((acc, day) => {
  acc[day.key] = { matin: false, apresMidi: false, soir: false };
  return acc;
}, {} as Availability);

interface ProviderProfileData {
  firstName: string;
  lastName: string;
  phone: string;
  neighborhood: string;
  skills: string[];
  availability: Availability;
}

function loadSavedProfile(): ProviderProfileData | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as ProviderProfileData;
  } catch {
    return null;
  }
}

interface ProviderProfileFormPageProps {
  onSubmit?: (data: ProviderProfileData) => void;
}

export default function ProviderProfileFormPage({
  onSubmit = () => {},
}: ProviderProfileFormPageProps) {
  const provider = getProvider(CURRENT_PROVIDER_ID);
  const saved = loadSavedProfile();

  const [nameParts] = useState(() => {
    const parts = provider?.name.split(' ') ?? [''];
    return { first: parts[0] ?? '', last: parts.slice(1).join(' ') };
  });

  const [firstName, setFirstName] = useState(saved?.firstName ?? nameParts.first);
  const [lastName, setLastName] = useState(saved?.lastName ?? nameParts.last);
  const [phone, setPhone] = useState(saved?.phone ?? '');
  const [neighborhood, setNeighborhood] = useState(
    () => saved?.neighborhood ?? (provider ? getNeighborhood(provider.neighborhoodId)?.name ?? '' : '')
  );
  const [skills, setSkills] = useState<string[]>(saved?.skills ?? []);
  const [skillInput, setSkillInput] = useState('');
  const [availability, setAvailability] = useState<Availability>(
    saved?.availability ?? EMPTY_AVAILABILITY
  );
  const [isEditing, setIsEditing] = useState(false);

  if (!provider) {
    return (
      <div className={page.page}>
        <p>Prestataire introuvable.</p>
      </div>
    );
  }

  function toggleSlot(day: DayKey, slot: TimeSlot) {
    setAvailability((prev) => ({
      ...prev,
      [day]: { ...prev[day], [slot]: !prev[day][slot] },
    }));
  }

  function addSkill() {
    const value = skillInput.trim();
    if (value.length === 0) return;
    if (skills.includes(value)) {
      setSkillInput('');
      return;
    }
    setSkills([...skills, value]);
    setSkillInput('');
  }

  function removeSkill(skill: string) {
    setSkills(skills.filter((s) => s !== skill));
  }

  function handleSkillKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const data: ProviderProfileData = { firstName, lastName, phone, neighborhood, skills, availability };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // Stockage indisponible (mode privé, quota dépassé...) — on continue sans bloquer l'utilisateur.
    }
    onSubmit(data);
    setIsEditing(false);
  }

  return (
    <div className={page.page}>
      <div className={styles.headerRow}>
        <div>
          <h1 className={page.title}>Mon profil</h1>
          <p className={page.subtitle}>
            Renseigne tes informations et tes compétences pour être visible auprès des demandeurs.
          </p>
        </div>
        {!isEditing && (
          <Button type="button" variant="secondary" onClick={() => setIsEditing(true)}>
            <Pencil size={16} aria-hidden="true" /> Modifier
          </Button>
        )}
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <div className={styles.field}>
            <label htmlFor="firstName" className={styles.label}>
              Prénom
            </label>
            <input
              id="firstName"
              type="text"
              className={styles.input}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Ex. Amadou"
              disabled={!isEditing}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="lastName" className={styles.label}>
              Nom
            </label>
            <input
              id="lastName"
              type="text"
              className={styles.input}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Ex. Issoufou"
              disabled={!isEditing}
            />
          </div>
        </div>

        <div className={styles.field}>
          <label htmlFor="phone" className={styles.label}>
            Numéro de téléphone
          </label>
          <input
            id="phone"
            type="tel"
            className={styles.input}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Ex. +227 90 00 00 00"
            disabled={!isEditing}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="neighborhood" className={styles.label}>
            Quartier
          </label>
          <input
            id="neighborhood"
            type="text"
            className={styles.input}
            value={neighborhood}
            onChange={(e) => setNeighborhood(e.target.value)}
            placeholder="Ex. Aéroport"
            disabled={!isEditing}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="skillInput" className={styles.label}>
            Compétences
          </label>
          <div className={styles.skillInputRow}>
            <input
              id="skillInput"
              type="text"
              className={styles.input}
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={handleSkillKeyDown}
              placeholder="Ex. Plomberie"
              disabled={!isEditing}
            />
            <Button type="button" variant="secondary" onClick={addSkill} disabled={!isEditing}>
              <Plus size={16} aria-hidden="true" /> Ajouter
            </Button>
          </div>

          {skills.length > 0 && (
            <div className={styles.skillList}>
              {skills.map((skill) => (
                <Badge key={skill} tone="neutral">
                  {skill}
                  {isEditing && (
                    <button
                      type="button"
                      className={styles.removeSkill}
                      onClick={() => removeSkill(skill)}
                      aria-label={`Retirer ${skill}`}
                    >
                      <X size={12} aria-hidden="true" />
                    </button>
                  )}
                </Badge>
              ))}
            </div>
          )}
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Disponibilités</label>
          <div className={styles.availabilityTable}>
            <div className={styles.availabilityHeaderRow}>
              <span></span>
              <span className={styles.slotHeader}>Matin</span>
              <span className={styles.slotHeader}>Après-midi</span>
              <span className={styles.slotHeader}>Soir</span>
            </div>
            {DAYS.map((day) => (
              <div key={day.key} className={styles.availabilityRow}>
                <span className={styles.dayLabel}>{day.label}</span>
                <label className={styles.checkboxCell}>
                  <input
                    type="checkbox"
                    checked={availability[day.key].matin}
                    onChange={() => toggleSlot(day.key, 'matin')}
                    disabled={!isEditing}
                  />
                </label>
                <label className={styles.checkboxCell}>
                  <input
                    type="checkbox"
                    checked={availability[day.key].apresMidi}
                    onChange={() => toggleSlot(day.key, 'apresMidi')}
                    disabled={!isEditing}
                  />
                </label>
                <label className={styles.checkboxCell}>
                  <input
                    type="checkbox"
                    checked={availability[day.key].soir}
                    onChange={() => toggleSlot(day.key, 'soir')}
                    disabled={!isEditing}
                  />
                </label>
              </div>
            ))}
          </div>
        </div>

        {isEditing && (
          <div className={styles.stickyFooter}>
            <Button
              type="button"
              variant="secondary"
              fullWidth
              onClick={() => setIsEditing(false)}
            >
              Annuler
            </Button>
            <Button type="submit" size="lg" fullWidth>
              Enregistrer
            </Button>
          </div>
        )}
      </form>
    </div>
  );
}
