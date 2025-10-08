import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Text } from '@/components/ui/text';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import * as React from 'react';
import { Pressable, TextInput, View } from 'react-native';
import { useUserStore } from '@/stores/userStore';
import pb from '@/services/pb';
import { useForm, Controller } from 'react-hook-form';
import { Info } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function SignUp() {
	const router = useRouter();
	const { setLoading } = useUserStore();

	const emailInputRef = React.useRef<TextInput>(null);
	const passwordInputRef = React.useRef<TextInput>(null);

	const {
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		defaultValues: {
			name: '',
			email: '',
			password: '',
		},
		mode: 'onBlur',
	});

	function onNameSubmitEditing() {
		emailInputRef.current?.focus();
	}

	function onEmailSubmitEditing() {
		passwordInputRef.current?.focus();
	}

	async function onSubmit(data: { name: string; email: string; password: string }) {
		try {
			setLoading(true);
			await pb.collection('users').create({
				email: data.email,
				password: data.password,
				passwordConfirm: data.password,
				name: data.name,
			});
			await pb.collection('users').authWithPassword(data.email, data.password);
		} catch (e: unknown) {
			console.error(e);
		} finally {
			reset();
			setLoading(false);
		}
	}

	return (
		<View className="gap-6">
			<Card className="border-border/0 shadow-none sm:border-border sm:shadow-sm sm:shadow-black/5">
				<CardHeader>
					<CardTitle className="text-center text-xl sm:text-left">Create your account</CardTitle>
					<CardDescription className="text-center sm:text-left">
						Welcome! Please fill in the details to get started.
					</CardDescription>
				</CardHeader>
				<CardContent className="gap-6">
					<View className="gap-6">
						<View className="gap-1.5">
							<Controller
								name="name"
								control={control}
								rules={{
									required: 'Name is required',
								}}
								render={({ field: { onChange, onBlur, value } }) => (
									<>
										<Label htmlFor="name">Name</Label>
										<Input
											id="name"
											placeholder="John Doe"
											autoComplete="name"
											autoCapitalize="words"
											onSubmitEditing={onNameSubmitEditing}
											returnKeyType="next"
											submitBehavior="submit"
											value={value}
											onBlur={onBlur}
											onChangeText={onChange}
										/>
									</>
								)}
							/>
							{errors.name && (
								<Alert icon={Info} variant="destructive">
									<AlertTitle className="font-medium text-red-700">Error</AlertTitle>
									<AlertDescription className="text-red-600">
										{errors.name.message}
									</AlertDescription>
								</Alert>
							)}
						</View>
						<View className="gap-1.5">
							<Controller
								name="email"
								control={control}
								rules={{
									required: 'Email is required',
									pattern: {
										value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
										message: 'Enter a valid email address',
									},
								}}
								render={({ field: { onChange, onBlur, value } }) => (
									<>
										<Label htmlFor="email">Email</Label>
										<Input
											ref={emailInputRef}
											id="email"
											placeholder="me@example.com"
											keyboardType="email-address"
											autoComplete="email"
											autoCapitalize="none"
											onSubmitEditing={onEmailSubmitEditing}
											returnKeyType="next"
											submitBehavior="submit"
											value={value}
											onBlur={onBlur}
											onChangeText={onChange}
										/>
									</>
								)}
							/>
							{errors.email && (
								<Alert icon={Info} variant="destructive" className="">
									<AlertTitle className="font-medium text-red-700">Error</AlertTitle>
									<AlertDescription className="text-red-600">
										{errors.email.message}
									</AlertDescription>
								</Alert>
							)}
						</View>
						<View className="gap-1.5">
							<Controller
								name="password"
								control={control}
								rules={{
									required: 'Password is required',
									minLength: {
										value: 10,
										message: 'Password must be at least 10 characters',
									},
									maxLength: {
										value: 128,
										message: 'Password cannot exceed 128 characters',
									},
								}}
								render={({ field: { onChange, onBlur, value } }) => (
									<>
										<View className="flex-row items-center">
											<Label htmlFor="password">Password</Label>
										</View>
										<Input
											ref={passwordInputRef}
											id="password"
											placeholder="************"
											secureTextEntry
											returnKeyType="send"
											onSubmitEditing={handleSubmit(onSubmit)}
											value={value}
											onBlur={onBlur}
											onChangeText={onChange}
										/>
									</>
								)}
							/>
							{errors.password && (
								<Alert icon={Info} variant="destructive">
									<AlertTitle className="font-medium text-red-700">Error</AlertTitle>
									<AlertDescription className="text-red-600">
										{errors.password.message}
									</AlertDescription>
								</Alert>
							)}
						</View>
						<Button variant="default" onPress={handleSubmit(onSubmit)}>
							<Text className="text-secondary">Continue</Text>
						</Button>
					</View>
					<Text className="text-center text-sm">
						Already have an account?{' '}
						<Pressable
							onPress={() => {
								router.replace('/(unauthenticated)');
							}}>
							<Text className="text-sm underline underline-offset-4">Log in</Text>
						</Pressable>
					</Text>
				</CardContent>
			</Card>
		</View>
	);
}
