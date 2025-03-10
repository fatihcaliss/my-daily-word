import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLanguageStore } from '../../store/languageStore';
import { useVocabularyStore } from '../../store/vocabularyStore';
import { languages } from '../../constants/language-selection';
import * as Notifications from 'expo-notifications';
import { useWordHistoryStore } from '@/store/wordHistoryStore';
import { useNotificationStore } from '@/store/notificationStore';
import {
  setupNotifications,
  scheduleNotifications,
  sendTestNotification,
} from '@/services/notificationService';

type VocabularyLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

type Level = {
  id: VocabularyLevel;
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
};

export default function SettingsScreen() {
  const { selectedLanguage, setSelectedLanguage } = useLanguageStore();
  const { selectedLevel, setSelectedLevel } = useVocabularyStore();
  const { clearHistory } = useWordHistoryStore();

  const {
    settings: {
      enabled: notifications,
      morningTime,
      afternoonTime,
      eveningTime,
      frequency,
    },
    setEnabled: setNotifications,
    setMorningTime,
    setAfternoonTime,
    setEveningTime,
    setFrequency,
  } = useNotificationStore();

  useEffect(() => {
    checkNotificationPermission();
  }, []);

  useEffect(() => {
    // Schedule notifications whenever settings change
    scheduleNotifications();
  }, [
    notifications,
    morningTime,
    afternoonTime,
    eveningTime,
    selectedLanguage,
    selectedLevel,
  ]);

  const checkNotificationPermission = async () => {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    setNotifications(existingStatus === 'granted');
  };

  const handleNotificationToggle = async (value: boolean) => {
    if (value) {
      const isSetup = await setupNotifications();
      if (!isSetup) {
        Alert.alert(
          'Permission Required',
          'Please enable notifications in your device settings to receive daily word reminders.',
          [{ text: 'OK' }]
        );
        return;
      }
    }
    setNotifications(value);
  };

  const handleLanguageSelect = (languageCode: string) => {
    setSelectedLanguage(languageCode);
  };

  const handleTestNotification = async () => {
    if (!notifications) {
      Alert.alert(
        'Notifications Disabled',
        'Please enable notifications first to send a test notification.',
        [{ text: 'OK' }]
      );
      return;
    }

    try {
      await sendTestNotification();
      Alert.alert(
        'Test Notification Sent',
        'Check your device notifications to see the test message.',
        [{ text: 'OK' }]
      );
    } catch (error) {
      Alert.alert(
        'Error',
        'Failed to send test notification. Please check your notification permissions.',
        [{ text: 'OK' }]
      );
    }
  };

  const levels: Level[] = [
    { id: 'beginner', name: 'Beginner', icon: 'school-outline' },
    { id: 'intermediate', name: 'Intermediate', icon: 'book-outline' },
    { id: 'advanced', name: 'Advanced', icon: 'ribbon-outline' },
    { id: 'expert', name: 'Expert', icon: 'trophy-outline' },
  ];

  const language =
    selectedLanguage === 'en'
      ? 'English'
      : selectedLanguage === 'es'
      ? 'Spanish'
      : selectedLanguage === 'fr'
      ? 'French'
      : selectedLanguage === 'de'
      ? 'German'
      : selectedLanguage === 'it'
      ? 'Italian'
      : selectedLanguage === 'tr'
      ? 'Turkish'
      : '';

  return (
    <ScrollView style={styles.container}>
      {/* <Text style={styles.title}>Settings</Text> */}

      {/* Language Selection Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Learning Language</Text>
        <View style={styles.languageGrid}>
          {languages.map((language) => (
            <TouchableOpacity
              key={language.code}
              style={[
                styles.languageButton,
                selectedLanguage === language.code &&
                  styles.languageButtonActive,
              ]}
              onPress={() => handleLanguageSelect(language.code)}
            >
              <View style={styles.languageContent}>
                <Text
                  style={[
                    styles.languageText,
                    selectedLanguage === language.code &&
                      styles.languageTextActive,
                  ]}
                >
                  {language.name}
                </Text>
                {selectedLanguage === language.code && (
                  <Ionicons name="checkmark-circle" size={20} color="#fff" />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Vocabulary Level Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Vocabulary Level</Text>
        <View style={styles.levelGrid}>
          {levels.map((level) => (
            <TouchableOpacity
              key={level.id}
              style={[
                styles.levelButton,
                selectedLevel === level.id && styles.levelButtonActive,
              ]}
              onPress={() => setSelectedLevel(level.id)}
            >
              <View style={styles.levelContent}>
                <View style={styles.levelInfo}>
                  <Ionicons
                    name={level.icon}
                    size={20}
                    color={selectedLevel === level.id ? '#fff' : '#666'}
                  />
                  <Text
                    style={[
                      styles.levelText,
                      selectedLevel === level.id && styles.levelTextActive,
                    ]}
                  >
                    {level.name}
                  </Text>
                </View>
                {selectedLevel === level.id && (
                  <Ionicons name="checkmark-circle" size={20} color="#fff" />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Notification Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notification Settings</Text>
        <View style={styles.settingRow}>
          <Text style={styles.settingText}>Enable Notifications</Text>
          <Switch
            value={notifications}
            onValueChange={handleNotificationToggle}
            trackColor={{ false: '#333', true: '#60a5fa' }}
            thumbColor={notifications ? '#fff' : '#f4f3f4'}
          />
        </View>

        {notifications && (
          <>
            <Text style={styles.sectionSubtitle}>Notification Times</Text>
            <TouchableOpacity
              style={styles.timeRow}
              onPress={() => setMorningTime(!morningTime)}
            >
              <View style={styles.timeInfo}>
                <Ionicons
                  name="sunny"
                  size={24}
                  color={morningTime ? '#60a5fa' : '#666'}
                />
                <Text style={styles.timeText}>Morning (9:00 AM)</Text>
              </View>
              <Ionicons
                name={
                  morningTime ? 'checkmark-circle-outline' : 'ellipse-outline'
                }
                size={24}
                color={morningTime ? '#60a5fa' : '#666'}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.timeRow}
              onPress={() => setAfternoonTime(!afternoonTime)}
            >
              <View style={styles.timeInfo}>
                <Ionicons
                  name="partly-sunny"
                  size={24}
                  color={afternoonTime ? '#60a5fa' : '#666'}
                />
                <Text style={styles.timeText}>Afternoon (2:00 PM)</Text>
              </View>
              <Ionicons
                name={
                  afternoonTime ? 'checkmark-circle-outline' : 'ellipse-outline'
                }
                size={24}
                color={afternoonTime ? '#60a5fa' : '#666'}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.timeRow}
              onPress={() => setEveningTime(!eveningTime)}
            >
              <View style={styles.timeInfo}>
                <Ionicons
                  name="moon"
                  size={24}
                  color={eveningTime ? '#60a5fa' : '#666'}
                />
                <Text style={styles.timeText}>Evening (8:00 PM)</Text>
              </View>
              <Ionicons
                name={
                  eveningTime ? 'checkmark-circle-outline' : 'ellipse-outline'
                }
                size={24}
                color={eveningTime ? '#60a5fa' : '#666'}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.testButton}
              onPress={handleTestNotification}
            >
              <Text style={styles.testButtonText}>Send Test Notification</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      {/* Clear Recent Words From Storage */}
      <TouchableOpacity
        style={styles.clearButton}
        onPress={() => clearHistory(selectedLanguage)}
      >
        <Text style={styles.clearButtonText}>
          Clear Recent Words for {language}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 32,
  },
  section: {
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  sectionSubtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ddd',
    marginTop: 16,
    marginBottom: 8,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingText: {
    fontSize: 16,
    color: '#fff',
  },
  frequencyButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  frequencyButton: {
    backgroundColor: '#2a2a2a',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
  },
  frequencyButtonActive: {
    backgroundColor: '#60a5fa',
  },
  frequencyButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: 'bold',
  },
  frequencyButtonTextActive: {
    color: '#fff',
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a2a',
  },
  timeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  timeText: {
    fontSize: 16,
    color: '#fff',
  },
  // New styles for language selection
  languageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  languageButton: {
    backgroundColor: '#2a2a2a',
    padding: 12,
    borderRadius: 8,
    width: '48%',
  },
  languageButtonActive: {
    backgroundColor: '#60a5fa',
  },
  languageContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  languageText: {
    fontSize: 16,
    color: '#666',
    fontWeight: 'bold',
  },
  languageTextActive: {
    color: '#fff',
  },
  // New styles for vocabulary level selection
  levelGrid: {
    flexDirection: 'column',
    gap: 8,
  },
  levelButton: {
    backgroundColor: '#2a2a2a',
    padding: 16,
    borderRadius: 8,
    width: '100%',
  },
  levelButtonActive: {
    backgroundColor: '#60a5fa',
  },
  levelContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  levelInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  levelText: {
    fontSize: 16,
    color: '#666',
    fontWeight: 'bold',
  },
  levelTextActive: {
    color: '#fff',
  },
  clearButton: {
    backgroundColor: '#f74b8a',
    padding: 16,
    borderRadius: 8,
    marginBottom: 32,
  },
  clearButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  testButton: {
    backgroundColor: '#60a5fa',
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  testButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
