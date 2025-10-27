/* eslint-disable @typescript-eslint/no-require-imports */
import * as React from 'react';
import { View, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import LogIn from '@/components/Login';

export default function UnauthenticatedIndex() {
	return (
		<SafeAreaProvider>
			<SafeAreaView className="flex-1">
				<TouchableWithoutFeedback
					onPress={Platform.OS !== 'web' ? Keyboard.dismiss : undefined}
					accessible={false}
				>
					<KeyboardAvoidingView
						className="flex-1"
						behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
						keyboardVerticalOffset={0}>
							<View className="flex-1 items-center justify-center gap-4 p-4">
								<LogIn />
							</View>
					</KeyboardAvoidingView>
				</TouchableWithoutFeedback>
			</SafeAreaView>
		</SafeAreaProvider>
	);
}
