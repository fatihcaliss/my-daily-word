import { useEffect } from 'react';
import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import { useNotificationStore } from '../store/notificationStore';
import {
  setupNotifications,
  scheduleNotifications,
} from '../services/notificationService';

// Configure notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function NotificationInitializer() {
  const { settings, setEnabled } = useNotificationStore();

  useEffect(() => {
    // Initialize notifications when the app starts
    const initializeNotifications = async () => {
      if (Platform.OS !== 'web') {
        // Check if we have permission
        const { status } = await Notifications.getPermissionsAsync();

        // Update the store with the current permission status
        setEnabled(status === 'granted');

        // If we have permission, schedule notifications based on settings
        if (status === 'granted' && settings.enabled) {
          await scheduleNotifications();
        }
      }
    };

    initializeNotifications();
  }, []);

  // This is a headless component, so it doesn't render anything
  return null;
}
