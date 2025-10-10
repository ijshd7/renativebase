import '@/global.css';

import { NAV_THEME } from '@/lib/theme';
import { ThemeProvider } from '@react-navigation/native';
import { PortalHost } from '@rn-primitives/portal';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useUserStore } from '@/stores/userStore';
import { usePersistedTheme } from '@/utils/usePersistedTheme';
import { Spinner } from '@/components/Spinner';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export default function RootLayout() {
  const { isAuthenticated, loading } = useUserStore();
  const { theme, loaded: isThemeLoaded } = usePersistedTheme();

  if (!isThemeLoaded || loading) {
		return <Spinner color={theme === 'dark' ? '#FBBF24' : '#3B82F6'} />;
	}

  return (
    <ThemeProvider value={NAV_THEME[theme ?? 'light']}>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
      <Stack>
        <Stack.Protected guard={!isAuthenticated}>
          <Stack.Screen name="(unauthenticated)" options={{ headerShown: false }} />
        </Stack.Protected>
        <Stack.Protected guard={isAuthenticated}>
          <Stack.Screen name="(authenticated)" options={{ headerShown: false }} />
        </Stack.Protected>
      </Stack>
      <PortalHost />
    </ThemeProvider>
  );
}
