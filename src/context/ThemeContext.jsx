import { createContext, useState } from 'react';

export const ThemeContext = createContext({});

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark');

  function updateTheme() {
    const curTheme = localStorage.getItem('theme');
    if (curTheme) {
      setTheme(curTheme);
    }
  }

  function toggleTheme() {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    if (newTheme === 'dark') {
      document.body.classList.add('dark');
      document.body.classList.remove('light');
    } else {
      document.body.classList.add('light');
      document.body.classList.remove('dark');
    }
    localStorage.setItem('theme', newTheme);
  }

  const value = { theme, updateTheme, toggleTheme };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;
