import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useWordHistoryStore } from '../../store/wordHistoryStore';
import { useLanguageStore } from '../../store/languageStore';
import { languages } from '../../constants/language-selection';

export default function ProgressScreen() {
  const { selectedLanguage } = useLanguageStore();
  const { recentWords, loadWords } = useWordHistoryStore();

  useEffect(() => {
    if (selectedLanguage) {
      loadWords(selectedLanguage);
    }
  }, [selectedLanguage]);

  const currentLanguageWords = recentWords[selectedLanguage] || [];
  const stats = {
    streak: 7, // This could be calculated based on daily learning activity
    wordsLearned: currentLanguageWords.length,
    accuracy: 89, // This could be calculated based on quiz results
    minutesSpent: 156, // This could be tracked based on app usage
  };

  const selectedLangData = languages.find(
    (lang) => lang.code === selectedLanguage
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Your Progress</Text>
      {selectedLanguage ? (
        <>
          <Text style={styles.subtitle}>Learning {selectedLangData?.name}</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <LinearGradient
                colors={['#60a5fa', '#3b82f6']}
                style={styles.statGradient}
              >
                <Text style={styles.statValue}>{stats.streak}</Text>
                <Text style={styles.statLabel}>Day Streak</Text>
              </LinearGradient>
            </View>

            <View style={styles.statCard}>
              <LinearGradient
                colors={['#34d399', '#10b981']}
                style={styles.statGradient}
              >
                <Text style={styles.statValue}>{stats.wordsLearned}</Text>
                <Text style={styles.statLabel}>Words Learned</Text>
              </LinearGradient>
            </View>

            <View style={styles.statCard}>
              <LinearGradient
                colors={['#f472b6', '#ec4899']}
                style={styles.statGradient}
              >
                <Text style={styles.statValue}>{stats.accuracy}%</Text>
                <Text style={styles.statLabel}>Accuracy</Text>
              </LinearGradient>
            </View>

            <View style={styles.statCard}>
              <LinearGradient
                colors={['#a78bfa', '#8b5cf6']}
                style={styles.statGradient}
              >
                <Text style={styles.statValue}>{stats.minutesSpent}</Text>
                <Text style={styles.statLabel}>Minutes Spent</Text>
              </LinearGradient>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recently Learned Words</Text>
            {currentLanguageWords.length > 0 ? (
              currentLanguageWords.map((word, index) => (
                <View key={index} style={styles.wordCard}>
                  <View>
                    <Text style={styles.word}>{word.word}</Text>
                    <Text style={styles.translation}>{word.translation}</Text>
                    <Text style={styles.pronunciation}>
                      {word.pronunciation}
                    </Text>
                  </View>
                  <Text style={styles.timestamp}>
                    {new Date(word.timestamp).toLocaleDateString()}
                  </Text>
                </View>
              ))
            ) : (
              <Text style={styles.noWords}>No words learned yet</Text>
            )}
          </View>
        </>
      ) : (
        <Text style={styles.noLanguage}>
          Please select a language in the Learn tab to start tracking progress
        </Text>
      )}
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
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#60a5fa',
    marginBottom: 24,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 32,
  },
  statCard: {
    width: '47%',
    borderRadius: 16,
    overflow: 'hidden',
  },
  statGradient: {
    padding: 16,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.8,
  },
  section: {
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  wordCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a2a',
  },
  word: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  translation: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  pronunciation: {
    fontSize: 14,
    color: '#60a5fa',
    fontStyle: 'italic',
  },
  timestamp: {
    fontSize: 12,
    color: '#666',
  },
  noWords: {
    color: '#666',
    textAlign: 'center',
    marginTop: 16,
  },
  noLanguage: {
    color: '#666',
    textAlign: 'center',
    marginTop: 32,
    fontSize: 16,
  },
});
