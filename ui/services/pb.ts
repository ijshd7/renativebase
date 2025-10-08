/* eslint-disable @typescript-eslint/no-explicit-any */
import RNEventSource from 'react-native-sse';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PocketBase, { AsyncAuthStore } from 'pocketbase';
import { env } from '../config/env';
import { useUserStore } from '@/stores/userStore';

// load the polyfill
const PatchedEventSource = RNEventSource as any;

PatchedEventSource.CONNECTING = 0;
PatchedEventSource.OPEN = 1;
PatchedEventSource.CLOSED = 2;

global.EventSource = PatchedEventSource;

const store = new AsyncAuthStore({
	save: async (serialized) => AsyncStorage.setItem('renativebase_pb_auth', serialized),
	initial: AsyncStorage.getItem('renativebase_pb_auth'),
	clear: async () => await AsyncStorage.removeItem('renativebase_pb_auth'),
});

const pb = new PocketBase(env.DB_BASE_URL, store);

pb.authStore.onChange(() => {
	useUserStore.setState({
		isAuthenticated: pb.authStore.isValid,
	});
});

export default pb;
