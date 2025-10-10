/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import type { TriggerRef } from '@rn-primitives/popover';
import { LogOutIcon } from 'lucide-react-native';
import * as React from 'react';
import { View } from 'react-native';
import pb from '@/services/pb';
import ThemeToggle from '@/components/ThemeToggle';

export default function UserMenu() {
	const popoverTriggerRef = React.useRef<TriggerRef>(null);

	async function onSignOut() {
		popoverTriggerRef.current?.close();
		pb.authStore.clear();
	}

	return (
		<Popover>
			<PopoverTrigger asChild ref={popoverTriggerRef}>
				<Button variant="ghost" size="icon" className="ml-2 size-8 rounded-full">
					<UserAvatar />
				</Button>
			</PopoverTrigger>
			<PopoverContent align="center" side="bottom" className="w-80 p-0">
				<View className="gap-3 border-b border-border p-3">
					<View className="flex-row items-center gap-3">
						<UserAvatar className="size-10" />
						<View className="flex-1">
							<Text className="font-medium leading-5">{pb.authStore?.record?.name}</Text>
						</View>
						<ThemeToggle />
					</View>
					<View className="flex-row flex-wrap gap-3 py-0.5">
						<Button variant="outline" size="sm" className="flex-1" onPress={onSignOut}>
							<Icon as={LogOutIcon} className="size-4" />
							<Text>Sign Out</Text>
						</Button>
					</View>
				</View>
			</PopoverContent>
		</Popover>
	);
}

function UserAvatar({ className, ...props }: Omit<React.ComponentProps<typeof Avatar>, 'alt'>) {
	const userRecord = pb?.authStore?.record || null;

	return (
		<Avatar
			alt={`${pb.authStore?.record?.name}'s avatar`}
			className={cn('size-8', className)}
			{...props}>
			<AvatarImage
				source={{
					uri: pb.files.getURL(userRecord as any, userRecord?.avatar),
				}}
			/>
			<AvatarFallback>
				<Text>{pb.authStore?.record?.name?.charAt(0)?.toUpperCase() || ''}</Text>
			</AvatarFallback>
		</Avatar>
	);
}
