import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'selectedLanguage';

interface LanguageState {
  selectedLanguage: string;
  isLanguageSelected: boolean;
  setSelectedLanguage: (language: string) => Promise<void>;
  initializeLanguage: () => Promise<void>;
  clearLanguageSelection: () => Promise<void>;
}

export const useLanguageStore = create<LanguageState>((set) => ({
  selectedLanguage: '',
  isLanguageSelected: false,
  setSelectedLanguage: async (language: string) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, language);
      set({ selectedLanguage: language, isLanguageSelected: true });
    } catch (error) {
      console.error('Error saving language:', error);
    }
  },
  initializeLanguage: async () => {
    await AsyncStorage.clear();
    try {
      const savedLanguage = await AsyncStorage.getItem(STORAGE_KEY);
      if (savedLanguage !== null) {
        set({ selectedLanguage: savedLanguage, isLanguageSelected: true });
      } else {
        set({ isLanguageSelected: false });
      }
    } catch (error) {
      console.error('Error loading saved language:', error);
      set({ isLanguageSelected: false });
    }
  },
  clearLanguageSelection: async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      set({ selectedLanguage: '', isLanguageSelected: false });
    } catch (error) {
      console.error('Error clearing language selection:', error);
    }
  },
}));
