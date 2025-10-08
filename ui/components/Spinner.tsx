import React from 'react';
import { View, ActivityIndicator } from 'react-native';

interface SpinnerProps {
	size?: 'small' | 'large';
	color?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({ size = 'large', color = '#3B82F6' }) => {
	return (
		<View className="flex-1 items-center justify-center bg-white">
			<ActivityIndicator size={size} color={color} />
		</View>
	);
};
