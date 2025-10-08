import * as React from 'react';
import { Tabs } from 'expo-router';
import { Icon } from '@/components/ui/icon';
import { Home } from 'lucide-react-native';

export default function AuthenticatedLayout() {
	return (
		<Tabs screenOptions={{ headerShown: true, headerTitleAlign: 'center' }}>
			<Tabs.Screen
				name="index"
				options={{
					title: 'Home',
					tabBarIcon: ({ color }) => <Icon as={Home} size={28} color={color} />,
				}}
			/>
		</Tabs>
	);
}
