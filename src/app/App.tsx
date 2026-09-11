import { ThemeProvider } from './ThemeProvider';
import { LanguageDirectionEffect } from './LanguageDirectionEffect';
import { RequestFlowProvider } from '../features/requester/RequestFlowContext';
import { AppRouter } from '../routes/AppRouter';

export function App() {
  return (
    <ThemeProvider>
      <LanguageDirectionEffect />
      <RequestFlowProvider>
        <AppRouter />
      </RequestFlowProvider>
    </ThemeProvider>
  );
}
