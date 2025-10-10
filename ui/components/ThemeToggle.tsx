import React from 'react';
import { Pressable, View } from 'react-native';
import { Icon } from '@/components/ui/icon';
import { MoonStar, Sun } from 'lucide-react-native';
import { cn } from '@/lib/utils';
import { usePersistedTheme } from '@/utils/usePersistedTheme';

export default function ThemeToggle() {
	const { theme, toggleTheme } = usePersistedTheme();
	const isDarkColorScheme = theme === 'dark';

	function handlePress() {
		toggleTheme();
	}

	return (
		<Pressable
			onPress={handlePress}
			className="web:ring-offset-background web:transition-colors web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2">
			{({ pressed }) => (
				<View
					className={cn(
						'aspect-square items-start justify-center pt-0.5 web:px-5',
						pressed && 'opacity-70'
					)}>
					{isDarkColorScheme ? (
						<Icon as={MoonStar} className="text-white" size={30} strokeWidth={1.25} />
					) : (
						<Icon as={Sun} className="text-black" size={30} strokeWidth={1.25} />
					)}
				</View>
			)}
		</Pressable>
	);
}
