import { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, TextInput, Button } from 'react-native';
import { Audio } from 'expo-av';

const StopWatch = () => {
  const [duration, setDuration] = useState(1);
  const [newDuration, setNewDuration] = useState(1);
  const [timeLeft, setTimeLeft] = useState(duration * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [sound, setSound] = useState();
  const [isNewStopwatch, setIsNewStopwatch] = useState(false);
  const [repetitions, setRepetitions] = useState(1);
  const [currentCycle, setCurrentCycle] = useState(1);

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      playSound();
      if (isNewStopwatch) {
        if (currentCycle >= repetitions) {
          setIsRunning(false);
        } else {
          setCurrentCycle((cycle) => cycle + 1);
          setIsNewStopwatch(false);
          setTimeLeft(duration * 60);
        }
      } else {
        startNewStopwatch();
      }
    }

    return () => clearInterval(timer);
  }, [isRunning, timeLeft, currentCycle]);

  const startTimer = () => {
    setTimeLeft(duration * 60);
    setIsRunning(true);
    setIsNewStopwatch(false);
    setCurrentCycle(1);
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setTimeLeft(duration * 60);
    setIsRunning(false);
    setIsNewStopwatch(false);
    setCurrentCycle(1);
  };

  const startNewStopwatch = () => {
    setIsRunning(true);
    setIsNewStopwatch(true);
    setTimeLeft(newDuration * 60);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(require('../assets/Alarm'));
    setSound(sound);
    await sound.playAsync();
  };

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../assets/FocusMaster.png')} />

      <Text style={styles.timer}> {formatTime(timeLeft)} </Text>

      <View style={styles.inputRow}>
        <Text style={styles.label}>Work Time (min):</Text>
        <TextInput 
          style={styles.input} 
          keyBoardType="numeric" 
          onChangeText={(text) => setDuration(Number(text))} 
          value={duration.toString()} 
          placeholder="Work Time"
        />
      </View>

      <View style={styles.inputRow}>
        <Text style={styles.label}>Break Time (min):</Text>
        <TextInput 
          style={styles.input} 
          keyBoardType="numeric" 
          onChangeText={(text) => setNewDuration(Number(text))} 
          value={newDuration.toString()} 
          placeholder="Break Time"
        />
      </View>

      <View style={styles.inputRow}>
        <Text style={styles.label}>Repetitions:</Text>
        <TextInput 
          style={styles.input} 
          keyBoardType="numeric" 
          onChangeText={(text) => setRepetitions(Number(text))} 
          value={repetitions.toString()} 
          placeholder="Repetitions"
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Start" onPress={startTimer} disabled={isRunning} />
        <Button title="Stop" onPress={stopTimer} disabled={!isRunning} />
        <Button title="Restart" onPress={resetTimer} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#deedf1',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginTop: 20,
  },
  logo: {
    height: 200,
    width: 200,
  },
  timer: {
    fontSize: 48,
    fontWeight: 'bold',
    marginVertical: 20,
    color: '#333',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginRight: 10,
  },
  input: {
    height: 40,
    borderColor: '#000',
    borderWidth: 1,
    paddingHorizontal: 10,
    width: 100,
    borderRadius: 20, 
    textAlign: 'center',
  },
});

export default StopWatch;
