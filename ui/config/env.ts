import Constants from 'expo-constants';

export const env = {
	DB_BASE_URL: Constants.expoConfig?.extra?.DB_BASE_URL || '',
};
