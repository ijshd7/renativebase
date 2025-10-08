import * as React from 'react';
import { View, Text } from 'react-native';
import pb from '@/services/pb';

export default function AuthenticatedIndex() {
	const name = pb.authStore?.record?.name || '';

	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<Text>Welcome back, {name}!</Text>
		</View>
	);
}
