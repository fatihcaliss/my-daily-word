import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { useNotificationStore } from '../store/notificationStore';
import { useLanguageStore } from '../store/languageStore';
import { useVocabularyStore } from '../store/vocabularyStore';
import * as Device from 'expo-device';
import { router } from 'expo-router';

// Configure notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// Set up notification categories and actions
export const setupNotifications = async () => {
  // Request permissions
  if (Platform.OS !== 'web') {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      return false;
    }
  }

  return true;
};

// Register for push notifications
export const registerForPushNotificationsAsync = async () => {
  if (!Device.isDevice) {
    console.log('Must use physical device for Push Notifications');
    return;
  }

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    console.log('Failed to get push token for push notification!');
    return;
  }
};

// Set up notification listeners
export const setupNotificationListeners = () => {
  // This listener is fired whenever a notification is received while the app is foregrounded
  const notificationListener = Notifications.addNotificationReceivedListener(
    (notification) => {
      console.log('Notification received in foreground:', notification);
    }
  );

  // This listener is fired whenever a user taps on or interacts with a notification
  const responseListener =
    Notifications.addNotificationResponseReceivedListener((response) => {
      const data = response.notification.request.content.data;
      console.log('Notification response received:', data);

      // Navigate to the home screen when a notification is tapped
      router.navigate('/');
    });

  return () => {
    Notifications.removeNotificationSubscription(notificationListener);
    Notifications.removeNotificationSubscription(responseListener);
  };
};

// Schedule notifications based on user settings
export const scheduleNotifications = async () => {
  // First cancel all existing notifications
  await Notifications.cancelAllScheduledNotificationsAsync();

  const { settings } = useNotificationStore.getState();
  const { selectedLanguage } = useLanguageStore.getState();
  const { selectedLevel } = useVocabularyStore.getState();

  // If notifications are disabled, don't schedule any
  if (!settings.enabled) {
    return;
  }

  const languageNames = {
    en: 'English',
    es: 'Spanish',
    fr: 'French',
    de: 'German',
    it: 'Italian',
    tr: 'Turkish',
  };

  const languageName =
    languageNames[selectedLanguage as keyof typeof languageNames] ||
    selectedLanguage;

  // Schedule notifications based on time preferences
  const scheduleTimes = [];

  if (settings.morningTime) {
    scheduleTimes.push({ hour: 9, minute: 0 });
  }

  if (settings.afternoonTime) {
    scheduleTimes.push({ hour: 14, minute: 0 });
  }

  if (settings.eveningTime) {
    scheduleTimes.push({ hour: 20, minute: 0 });
  }

  // Schedule notifications for each time
  for (const time of scheduleTimes) {
    const trigger = {
      hour: time.hour,
      minute: time.minute,
      repeats: true,
    };

    await Notifications.scheduleNotificationAsync({
      content: {
        title: `Time for your daily ${languageName} word!`,
        body: `Expand your ${selectedLevel} vocabulary with a new word today.`,
        data: { selectedLanguage, selectedLevel },
      },
      trigger,
    });
  }
};

// Function to send an immediate test notification
export const sendTestNotification = async () => {
  const { selectedLanguage } = useLanguageStore.getState();
  const { selectedLevel } = useVocabularyStore.getState();

  const languageNames = {
    en: 'English',
    es: 'Spanish',
    fr: 'French',
    de: 'German',
    it: 'Italian',
    tr: 'Turkish',
  };

  const languageName =
    languageNames[selectedLanguage as keyof typeof languageNames] ||
    selectedLanguage;

  await Notifications.scheduleNotificationAsync({
    content: {
      title: `Test Notification: ${languageName} Word`,
      body: `This is a test notification for your ${selectedLevel} vocabulary learning.`,
      data: { selectedLanguage, selectedLevel },
    },
    trigger: null, // null means send immediately
  });
};
