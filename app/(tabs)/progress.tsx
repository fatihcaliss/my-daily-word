import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function ProgressScreen() {
  const stats = {
    streak: 7,
    wordsLearned: 42,
    accuracy: 89,
    minutesSpent: 156,
  };

  const recentWords = [
    { word: 'Bonjour', translation: 'Hello', language: 'French' },
    { word: 'Gracias', translation: 'Thank you', language: 'Spanish' },
    { word: 'Ciao', translation: 'Hello/Goodbye', language: 'Italian' },
    { word: 'Bitte', translation: 'Please', language: 'German' },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Your Progress</Text>

      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <LinearGradient
            colors={['#60a5fa', '#3b82f6']}
            style={styles.statGradient}>
            <Text style={styles.statValue}>{stats.streak}</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </LinearGradient>
        </View>

        <View style={styles.statCard}>
          <LinearGradient
            colors={['#34d399', '#10b981']}
            style={styles.statGradient}>
            <Text style={styles.statValue}>{stats.wordsLearned}</Text>
            <Text style={styles.statLabel}>Words Learned</Text>
          </LinearGradient>
        </View>

        <View style={styles.statCard}>
          <LinearGradient
            colors={['#f472b6', '#ec4899']}
            style={styles.statGradient}>
            <Text style={styles.statValue}>{stats.accuracy}%</Text>
            <Text style={styles.statLabel}>Accuracy</Text>
          </LinearGradient>
        </View>

        <View style={styles.statCard}>
          <LinearGradient
            colors={['#a78bfa', '#8b5cf6']}
            style={styles.statGradient}>
            <Text style={styles.statValue}>{stats.minutesSpent}</Text>
            <Text style={styles.statLabel}>Minutes Spent</Text>
          </LinearGradient>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recently Learned Words</Text>
        {recentWords.map((word, index) => (
          <View key={index} style={styles.wordCard}>
            <View>
              <Text style={styles.word}>{word.word}</Text>
              <Text style={styles.translation}>{word.translation}</Text>
            </View>
            <Text style={styles.language}>{word.language}</Text>
          </View>
        ))}
      </View>
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
    alignItems: 'center',
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
  },
  language: {
    fontSize: 14,
    color: '#60a5fa',
    fontWeight: 'bold',
  },
});