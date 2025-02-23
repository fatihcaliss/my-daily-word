import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { languages } from '../../constants/language-selection';
import { useLanguageStore } from '../../store/languageStore';

export default function LearnScreen() {
  const {
    selectedLanguage,
    setSelectedLanguage,
    initializeLanguage,
    isLanguageSelected,
  } = useLanguageStore();
  const [loading, setLoading] = useState(false);
  const [wordData, setWordData] = useState({
    Word: '',
    Translation: '',
    Pronunciation: '',
    'Example Sentence': '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    initializeLanguage();
  }, []);

  const handleLanguageSelect = async (languageCode: string) => {
    try {
      await setSelectedLanguage(languageCode);
      setWordData({
        Word: '',
        Translation: '',
        Pronunciation: '',
        'Example Sentence': '',
      }); // Reset any previous word data
    } catch (error) {
      console.error('Error saving language:', error);
      setError('Failed to save language selection');
    }
  };

  const fetchWordFromGemini = async () => {
    setLoading(true);
    setError('');

    try {
      const selectedLangData = languages.find(
        (lang) => lang.code === selectedLanguage
      );
      if (!selectedLangData) {
        throw new Error('Language not found');
      }

      const response = await fetch(
        `${process.env.EXPO_PUBLIC_GEMINI_API_ENDPOINT}?key=${process.env.EXPO_PUBLIC_GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: selectedLangData.aiPrompt,
                  },
                ],
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      // Extract the generated content from Gemini's response structure
      const generatedContent = data.candidates[0].content.parts[0].text;
      const cleanJson = generatedContent.replace(/```json\n|\n```/g, '');
      try {
        const parsedData = JSON.parse(cleanJson);
        setWordData(parsedData);
      } catch (error) {
        console.error('Error parsing JSON:', error);
        setError('Failed to parse learning content');
      }
    } catch (error) {
      console.error('Error fetching from Gemini:', error);
      setError('Failed to fetch learning content');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    selectedLanguage && fetchWordFromGemini();
  }, [selectedLanguage]);
  console.log('wordData', wordData);
  console.log('isLanguageSelected', isLanguageSelected);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {!selectedLanguage && (
          <View>
            <Text style={styles.title}>Choose Your Language</Text>
            <Text style={styles.subtitle}>
              Select a language to start learning
            </Text>

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
                    resizeMode="cover"
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
          </View>
        )}

        <TouchableOpacity
          style={[
            styles.startButton,
            (!selectedLanguage || loading) && styles.startButtonDisabled,
          ]}
          onPress={fetchWordFromGemini}
          disabled={!selectedLanguage || loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.startButtonText}>
              {wordData?.Word ? 'Get Next Word' : 'Start Learning'}
            </Text>
          )}
        </TouchableOpacity>

        {error && <Text style={styles.errorText}>{error}</Text>}

        {isLanguageSelected && (
          <View style={styles.titleContainer}>
            <Text style={styles.wordText}>
              {selectedLanguage &&
                'Your learning language is: ' + selectedLanguage}
            </Text>
          </View>
        )}

        {wordData && isLanguageSelected && (
          <View style={styles.wordContainer}>
            <Text style={styles.wordText}>Word: {wordData.Word}</Text>
            <Text style={styles.wordText}>
              Translation: {wordData.Translation}
            </Text>
            <Text style={styles.wordText}>
              Pronunciation: {wordData.Pronunciation}
            </Text>
            <Text style={styles.wordText}>
              Example: {wordData['Example Sentence']}
            </Text>
          </View>
        )}
      </ScrollView>
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
  titleContainer: {
    marginTop: 32,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    color: '#fff',
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
  errorText: {
    color: '#ef4444',
    marginTop: 16,
    textAlign: 'center',
  },
  wordContainer: {
    backgroundColor: '#2a2a2a',
    padding: 16,
    borderRadius: 12,
    marginTop: 24,
  },
  wordText: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 24,
  },
});
