import { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [frequency, setFrequency] = useState(3);
  const [morningTime, setMorningTime] = useState(true);
  const [afternoonTime, setAfternoonTime] = useState(true);
  const [eveningTime, setEveningTime] = useState(true);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notification Settings</Text>

      <View style={styles.section}>
        <View style={styles.settingRow}>
          <Text style={styles.settingText}>Enable Notifications</Text>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
            trackColor={{ false: '#333', true: '#60a5fa' }}
            thumbColor={notifications ? '#fff' : '#f4f3f4'}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Daily Word Frequency</Text>
        <View style={styles.frequencyButtons}>
          {[1, 3, 5, 7].map((num) => (
            <TouchableOpacity
              key={num}
              style={[
                styles.frequencyButton,
                frequency === num && styles.frequencyButtonActive,
              ]}
              onPress={() => setFrequency(num)}
            >
              <Text
                style={[
                  styles.frequencyButtonText,
                  frequency === num && styles.frequencyButtonTextActive,
                ]}
              >
                {num}x
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notification Times</Text>
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
            name={morningTime ? 'checkmark-circle-outline' : 'ellipse-outline'}
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
            name={eveningTime ? 'checkmark-circle-outline' : 'ellipse-outline'}
            size={24}
            color={eveningTime ? '#60a5fa' : '#666'}
          />
        </TouchableOpacity>
      </View>
    </View>
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
});
