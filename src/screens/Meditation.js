import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, Alert } from "react-native";
import { Audio } from 'expo-av';
import Controller from "../components/Controller";
import PlayerSlider from "../components/PlayerSlider";
import LoadingSpinner from "../components/LoadingSpinner";
import { styles } from '../styles/Styles';
import * as firebase from 'firebase/app';
import "firebase/storage";

const JUMP_IN_MILLISECONDS = 30000;

const Meditation = ({route}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  // These must be initialized to null due to the way if conditions are written throughout.
  const [sound, setSound] = useState(null);
  const [soundStatus, setSoundStatus] = useState(null);

  const item = route.params;

  const playbackStatusUpdateCallback = (playbackStatus) => {
    // Don't try to update the status if not loaded anymore.
    // Unloaded audio means user left the screen, so state variables cannot be updated anymore.
    if (playbackStatus.isLoaded) {
      setSoundStatus(playbackStatus);

      // After finishing, stopAsync() brings it back to the beginning and makes it paused.
      if (playbackStatus.didJustFinish) {
        sound.stopAsync();
        setIsPlaying(false);
      }
    }
  };

  const setupSound = async () => {
    if (!item.audioPath) {
      Alert.alert(
        "Error Getting Audio",
        "There was an error when retrieving the audio.",
        [
          {text: "OK"}
        ]
      );
      setIsLoaded(true);
    }
    else {
      const dbh = firebase.firestore();
      // https://firebase.google.com/docs/storage/web/download-files
      let storage = firebase.storage();
      let pathReference = storage.ref(item.audioPath);
      pathReference.getDownloadURL()
      .catch((error) => {
        Alert.alert(
          "Error Getting Audio",
          "There was an error when retrieving the audio.",
          [
            {text: "OK"}
          ]
        );
        setIsLoaded(true);
      })
      .then(async (url) => {
        // Adapted from: https://ndpniraj.com/play-pause-resume-audio-from-remote-api-react-native-expo/
        if (sound !== null && soundStatus === null) {
          const status = await sound.loadAsync(
            { uri: url },
            { shouldPlay: false }
          );
          setIsPlaying(false);
          setIsLoaded(true);
          sound.setOnPlaybackStatusUpdate(playbackStatusUpdateCallback);
          return setSoundStatus(status);
        }
      });
    }
  };

  // Adapted from: https://ndpniraj.com/play-pause-resume-audio-from-remote-api-react-native-expo/
  useEffect(() => {
    if (!sound) {
      setSound(new Audio.Sound());
    }
    setupSound();

    // For unloading the sound when exiting page
    // Need to put sound in the [], too
    // Code from: https://docs.expo.io/versions/latest/sdk/audio/
    return sound
    ? () => { sound.unloadAsync(); }
    : undefined;
  }, [sound]);

  const quickForward = async () => {
    if (soundStatus !== null) {
      let newPos = soundStatus.positionMillis + JUMP_IN_MILLISECONDS;
      if (soundStatus.durationMillis < newPos) {
        await sound.setPositionAsync(soundStatus.durationMillis);
      }
      else {
        await sound.setPositionAsync(newPos);
      }
    }
  };

  const quickBackward = async () => {
    if (soundStatus !== null) {
      let newPos = soundStatus.positionMillis - JUMP_IN_MILLISECONDS;
      if (newPos < 0) {
        await sound.setPositionAsync(0);
      }
      else {
        await sound.setPositionAsync(newPos);
      }
    }
  };

  const playPause = async () => {
    if (soundStatus !== null) {
      // Adapted from: https://ndpniraj.com/play-pause-resume-audio-from-remote-api-react-native-expo/
      // It will pause our audio
      if (soundStatus.isPlaying) {
        const status = await sound.pauseAsync();
        setIsPlaying(false);
        return setSoundStatus(status);
      }
  
      // It will resume our audio
      if (!soundStatus.isPlaying) {
        const status = await sound.playAsync();
        setIsPlaying(true);
        return setSoundStatus(status);
      }
    }
  };

  const goToPosition = async (position) => {
    if (soundStatus !== null) {
      await sound.setPositionAsync(position * 1000);
    }
  };

  return (
    <View style={styles.app}>
    {
      isLoaded ?
      <View style={styles.fullWidthWindow}>

      <Image source={{ uri: item.imagePath }}
        style={styles.meditationPhoto}></Image>
      <Text style={styles.contentTitle}>{item.title}</Text>
      
      <View style={styles.sliderAndController}>
        <PlayerSlider currentValue={soundStatus ? soundStatus.positionMillis / 1000 : 0} setCurrentValue={(position) => goToPosition(position)} duration={item.duration}/>
        <Controller isPlaying={isPlaying} quickForward={quickForward} quickBackward={quickBackward} playPause={playPause} />
      </View>   

      <ScrollView style={styles.contentDescriptionSpacer}>
        <Text style={styles.contentDesc}>{item.description}</Text>
      </ScrollView>
      </View>
    : <LoadingSpinner />
    }
    </View>
  );
};

export default Meditation;
