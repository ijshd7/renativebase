/* eslint-disable @typescript-eslint/no-require-imports */
import * as React from 'react';
import { View, SafeAreaView, KeyboardAvoidingView, Platform, ImageBackground } from 'react-native';
import LogIn from '@/components/Login';

export default function UnauthenticatedIndex() {
	return (
		<SafeAreaView className="flex-1">
			<KeyboardAvoidingView
				className="flex-1"
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}>
                    <View className="flex-1 items-center justify-center gap-4 p-4">
                        <LogIn />
                    </View>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
}
