import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Switch, TextInput, Button } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { ref, set } from 'firebase/database';
import { database } from '../../firebaseconfig';

export default function WaterLevel() {
  const [waterLevel, setWaterLevel] = useState(0);
  const [isServoOn, setIsServoOn] = useState(false);
  const [timerValue, setTimerValue] = useState('');
  const [foodDispenseCount, setFoodDispenseCount] = useState(0); // To track food dispense count

  const fetchWaterLevel = async () => {
    try {
      const response = await fetch('https://blynk.cloud/external/api/get?token=NqXOR_TdkhVvJzSK4N6WxLGmZNoKu6Se&pin=V2');
      const data = await response.text();
      const level = parseFloat(data);

      if (!isNaN(level)) { // Check if the parsed level is a number
        const maxLevel = 20; // Replace with the max level value from your setup
        const progress = Math.max(0, Math.min(1, level / maxLevel));
        setWaterLevel(progress);
      } else {
        console.error('Invalid water level:', data);
      }
    } catch (error) {
      console.error('Error fetching water level:', error);
    }
  };

  const toggleServo = async (value) => {
    try {
      setIsServoOn(value);
      const servoState = value ? '1' : '0';
      await fetch(`https://blynk.cloud/external/api/update?token=NqXOR_TdkhVvJzSK4N6WxLGmZNoKu6Se&pin=V4&value=${servoState}`);
      
      // Record the food dispense event to Firebase (both for manual and automatic dispenses)
      recordFoodDispense();
    } catch (error) {
      console.error('Error toggling servo motor:', error);
    }
  };

  // Function to record food dispense data in Firebase
  const recordFoodDispense = async () => {
    try {
      // Create a reference to store dispense data with timestamp as the key
      const dispenseRef = ref(database, 'foodDispenses/' + Date.now()); // Using timestamp for unique key
      await set(dispenseRef, {
        dispenseTime: Date.now(),
        foodCount: foodDispenseCount, // Use the count of food dispensed
      });

      // Update the dispense count for future use
      setFoodDispenseCount(foodDispenseCount + 1);

      console.log('Food dispense recorded:', foodDispenseCount);
    } catch (error) {
      console.error('Error recording dispense:', error);
    }
  };

  // Timer function to set the dispensing schedule
  const updateTimerValue = async () => {
    const minutes = parseInt(timerValue);
    if (isNaN(minutes) || minutes <= 0) {
      alert('Please enter a valid timer value (in minutes)');
      return;
    }

    try {
      // Send the value directly in minutes
      await fetch(`https://blynk.cloud/external/api/update?token=NqXOR_TdkhVvJzSK4N6WxLGmZNoKu6Se&pin=V3&value=${minutes}`);
    } catch (error) {
      console.error('Error updating timer value:', error);
    }
  };

  useEffect(() => {
    const interval = setInterval(fetchWaterLevel, 5000); // Fetch every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Water Level</Text>
      <ProgressBar progress={waterLevel} color="#2196F3" style={styles.progressBar} />
      <Text>{Math.round(waterLevel * 100)}%</Text>

      <View style={styles.toggleContainer}>
        <Text>Servo Motor</Text>
        <Switch
          value={isServoOn}
          onValueChange={toggleServo}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Set Timer (in minutes):</Text>
        <TextInput
          style={styles.textInput}
          keyboardType="numeric"
          value={timerValue}
          onChangeText={setTimerValue}
        />
        <Button title="Set Timer" onPress={updateTimerValue} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  progressBar: {
    width: 200,
    height: 10,
    marginVertical: 20,
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  inputContainer: {
    width: '80%',
    marginTop: 30,
    alignItems: 'center',
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 10,
  },
  textInput: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 10,
  },
});
