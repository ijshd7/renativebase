export type UserState = {
	loading: boolean;
	isAuthenticated: boolean;

	setLoading: (isLoading: boolean) => void;
	setIsAuthenticated: (isAuthenticated: boolean) => void;
};
