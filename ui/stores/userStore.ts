import { create } from 'zustand';
import { UserState } from '@/types/users.types';

export const useUserStore = create<UserState>((set) => ({
	loading: false,
	isAuthenticated: false,

	setLoading: (isLoading: boolean) => {
		set({ loading: isLoading });
	},
	setIsAuthenticated: (isAuthenticated: boolean) => {
		set({ isAuthenticated: isAuthenticated });
	},
}));
