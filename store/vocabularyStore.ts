import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

type VocabularyLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

interface VocabularyState {
  selectedLevel: VocabularyLevel;
  setSelectedLevel: (level: VocabularyLevel) => void;
}

export const useVocabularyStore = create<VocabularyState>((set) => ({
  selectedLevel: 'beginner',
  setSelectedLevel: async (level) => {
    try {
      await AsyncStorage.setItem('@vocabulary_level', level);
      set({ selectedLevel: level });
    } catch (error) {
      console.error('Error saving vocabulary level:', error);
    }
  },
}));

// Initialize store with saved value
AsyncStorage.getItem('@vocabulary_level')
  .then((level) => {
    if (level) {
      useVocabularyStore.getState().setSelectedLevel(level as VocabularyLevel);
    }
  })
  .catch((error) => {
    console.error('Error loading vocabulary level:', error);
  });
