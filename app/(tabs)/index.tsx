import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { languages } from '../../constants/language-selection';
const STORAGE_KEY = 'selectedLanguage';

export default function LearnScreen() {
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

  useEffect(() => {
    loadSavedLanguage();
  }, []);

  const loadSavedLanguage = async () => {
    try {
      const savedLanguage = await AsyncStorage.getItem(STORAGE_KEY);
      if (savedLanguage !== null) {
        setSelectedLanguage(savedLanguage);
      }
    } catch (error) {
      console.error('Error loading saved language:', error);
    }
  };

  const handleLanguageSelect = async (languageCode: string) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, languageCode);
      setSelectedLanguage(languageCode);
    } catch (error) {
      console.error('Error saving language:', error);
    }
  };
  console.log('selectedLanguage', selectedLanguage);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.title}>Choose Your Language</Text>
        <Text style={styles.subtitle}>Select a language to start learning</Text>

        <View style={styles.grid}>
          {languages.map((language) => (
            <TouchableOpacity
              key={language.code}
              style={[
                styles.card,
                selectedLanguage === language.code && styles.selectedCard,
              ]}
              onPress={() => handleLanguageSelect(language.code)}
            >
              <Image
                source={{ uri: language.image }}
                style={styles.cardImage}
              />
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.8)']}
                style={styles.gradient}
              >
                <Text style={styles.cardText}>{language.name}</Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={[
            styles.startButton,
            !selectedLanguage && styles.startButtonDisabled,
          ]}
          disabled={!selectedLanguage}
        >
          <Text style={styles.startButtonText}>Start Learning</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 12,
    paddingTop: 0,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 8,
  },
  card: {
    width: '48%',
    height: 160,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#2a2a2a',
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: '#60a5fa',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
    justifyContent: 'flex-end',
    padding: 12,
  },
  cardText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  startButton: {
    backgroundColor: '#60a5fa',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 32,
  },
  startButtonDisabled: {
    backgroundColor: '#2a2a2a',
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
