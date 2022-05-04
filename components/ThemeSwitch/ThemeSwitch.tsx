import { Moon, Sun } from '@components/Icons';
import { Toggle } from '@components/Motion';
import { useReducedMotion } from '@components/utils';
import { useDarkMode } from '@hooks';
import { useCallback } from 'react';
import styles from './ThemeSwitch.module.css';

interface Props {
  className?: string;
}

const ThemeSwitch = ({ className }: Props): JSX.Element => {
  const [darkMode, setDarkMode] = useDarkMode();
  const shouldReduceMotion = useReducedMotion();
  const handleClick = useCallback(() => {
    setDarkMode(!darkMode);
  }, [darkMode, setDarkMode]);

  return (
    <Toggle
      className={styles.button}
      isToggled={darkMode}
      onToggle={handleClick}
      iconClose={<Sun className={className} />}
      iconOpen={<Moon className={className} />}
      shouldReduceMotion={shouldReduceMotion}
    />
  );
};

export default ThemeSwitch;
