import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface WordHistory {
  word: string;
  translation: string;
  pronunciation: string;
  exampleSentence: string;
  timestamp: number;
}

interface WordHistoryState {
  recentWords: { [key: string]: WordHistory[] }; // key is language code
  addWord: (languageCode: string, word: WordHistory) => Promise<void>;
  loadWords: (languageCode: string) => Promise<void>;
  clearHistory: (languageCode: string) => Promise<void>;
}

const MAX_WORDS = 1000;

const getStorageKey = (languageCode: string) => `recent_${languageCode}_words`;

export const useWordHistoryStore = create<WordHistoryState>((set, get) => ({
  recentWords: {},

  addWord: async (languageCode: string, word: WordHistory) => {
    try {
      const currentWords = get().recentWords[languageCode] || [];
      const newWords = [word, ...currentWords].slice(0, MAX_WORDS);

      await AsyncStorage.setItem(
        getStorageKey(languageCode),
        JSON.stringify(newWords)
      );

      set((state) => ({
        recentWords: {
          ...state.recentWords,
          [languageCode]: newWords,
        },
      }));
    } catch (error) {
      console.error('Error saving word history:', error);
    }
  },

  loadWords: async (languageCode: string) => {
    try {
      const savedWords = await AsyncStorage.getItem(
        getStorageKey(languageCode)
      );
      if (savedWords) {
        const words = JSON.parse(savedWords) as WordHistory[];
        set((state) => ({
          recentWords: {
            ...state.recentWords,
            [languageCode]: words,
          },
        }));
      }
    } catch (error) {
      console.error('Error loading word history:', error);
    }
  },

  clearHistory: async (languageCode: string) => {
    try {
      await AsyncStorage.removeItem(getStorageKey(languageCode));
      set((state) => ({
        recentWords: {
          ...state.recentWords,
          [languageCode]: [],
        },
      }));
    } catch (error) {
      console.error('Error clearing word history:', error);
    }
  },
}));
