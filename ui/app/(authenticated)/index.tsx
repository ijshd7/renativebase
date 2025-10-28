import * as React from 'react';
import { View, Text } from 'react-native';
import pb from '@/services/pb';

export default function AuthenticatedIndex() {
	const name = pb.authStore?.record?.name || '';

	return (
		<View className="flex flex-1 justify-center items-center">
			<Text className="text-primary">Welcome back, {name}!</Text>
		</View>
	);
}
