import { ThemeProvider } from './ThemeProvider';
import { LanguageDirectionEffect } from './LanguageDirectionEffect';
import { AppRouter } from '../routes/AppRouter';

export function App() {
  return (
    <ThemeProvider>
      <LanguageDirectionEffect />
      <AppRouter />
    </ThemeProvider>
  );
}
