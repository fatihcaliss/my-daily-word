import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface NotificationSettings {
  enabled: boolean;
  frequency: number;
  morningTime: boolean;
  afternoonTime: boolean;
  eveningTime: boolean;
}

interface NotificationStore {
  settings: NotificationSettings;
  setEnabled: (enabled: boolean) => void;
  setFrequency: (frequency: number) => void;
  setMorningTime: (enabled: boolean) => void;
  setAfternoonTime: (enabled: boolean) => void;
  setEveningTime: (enabled: boolean) => void;
}

export const useNotificationStore = create<NotificationStore>()(
  persist(
    (set) => ({
      settings: {
        enabled: false,
        frequency: 3,
        morningTime: true,
        afternoonTime: true,
        eveningTime: true,
      },
      setEnabled: (enabled) =>
        set((state) => ({
          settings: { ...state.settings, enabled },
        })),
      setFrequency: (frequency) =>
        set((state) => ({
          settings: { ...state.settings, frequency },
        })),
      setMorningTime: (morningTime) =>
        set((state) => ({
          settings: { ...state.settings, morningTime },
        })),
      setAfternoonTime: (afternoonTime) =>
        set((state) => ({
          settings: { ...state.settings, afternoonTime },
        })),
      setEveningTime: (eveningTime) =>
        set((state) => ({
          settings: { ...state.settings, eveningTime },
        })),
    }),
    {
      name: 'notification-settings',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
