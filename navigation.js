// components/NextButton.js
import React from 'react';
import { View, Button } from 'react-native';
import { Audio } from 'expo-av';

class NextButton extends React.Component {
  playSound = async () => {
    await Audio.Sound.createAsync({
      uri: 'https://cdn.pixabay.com/download/audio/2024/04/21/audio_1b8d3bcd3d.mp3',
    }, { shouldPlay: true });
  };
}

export default NextButton;