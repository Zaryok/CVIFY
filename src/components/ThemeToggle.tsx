import { Moon, Sun } from 'lucide-react';
import { useCustomTheme } from '../hooks/useCustomTheme';

export function ThemeToggle() {
  const { isDark, setTheme } = useCustomTheme();

  return (
    <button
      className="p-2 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}