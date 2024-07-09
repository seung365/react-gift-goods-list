import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';

import type { ThemeData } from '@/types/index';

interface ThemeContextProps {
  themes: ThemeData[];
  loading: boolean;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [themes, setthemes] = useState<ThemeData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTheme = async () => {
      const url = 'https://react-gift-mock-api-seungbeom.vercel.app/api/v1/themes';
      try {
        const response = await axios.get(url);
        setthemes(response.data.themes);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchTheme();
  }, []);

  useEffect(() => {
    console.log(themes);
  }, [themes]);

  return <ThemeContext.Provider value={{ themes, loading }}>{children}</ThemeContext.Provider>;
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within ThemeProvider');
  }
  return context;
};
