import { ThemeProvider } from '@/provider/API/ThemeContext';

import { AuthProvider } from './provider/Auth';
import { Routes } from './routes';

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
