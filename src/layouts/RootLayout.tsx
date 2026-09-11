import { Outlet, Link } from 'react-router-dom';
import { ThemeToggle } from '../components/layout/ThemeToggle';
import { LanguageSwitcher } from '../components/layout/LanguageSwitcher';
import styles from './RootLayout.module.css';

export function RootLayout() {
  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <Link to="/" className={styles.logo}>
          PROJET À VENIR
        </Link>
        <div className={styles.controls}>
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}
