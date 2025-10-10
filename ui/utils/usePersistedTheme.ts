import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'nativewind';

type ThemeMode = 'light' | 'dark';

export function usePersistedTheme() {
	const { colorScheme: nativewindColorScheme, setColorScheme } = useColorScheme();
	const [theme, setThemeState] = useState<ThemeMode>(nativewindColorScheme ?? 'light');
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		AsyncStorage.getItem('theme').then((stored) => {
			if (stored === 'light' || stored === 'dark') {
				setThemeState(stored);
				setColorScheme(stored);
			} else {
				const initial = nativewindColorScheme ?? 'light';
				setThemeState(initial);
				setColorScheme(initial);
			}
			setLoaded(true);
		});
	}, [setColorScheme, nativewindColorScheme]);

	const updateTheme = (newTheme: ThemeMode) => {
		setThemeState(newTheme);
		setColorScheme(newTheme);
		AsyncStorage.setItem('theme', newTheme).catch((err) => {
			console.error('Failed to save theme', err);
		});
	};

	const toggleTheme = () => {
		updateTheme(theme === 'light' ? 'dark' : 'light');
	};

	return { theme, setTheme: updateTheme, toggleTheme, loaded };
}
