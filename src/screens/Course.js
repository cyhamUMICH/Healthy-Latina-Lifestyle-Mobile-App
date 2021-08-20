import React, { useEffect, useState, useRef } from "react";
import { View, Text, Image, ScrollView, Alert } from "react-native";
import { Video, Audio } from 'expo-av';
import Controller from "../components/Controller";
import PlayerSlider from "../components/PlayerSlider";
import SetFeatured from "../components/SetFeatured";
import LoadingSpinner from "../components/LoadingSpinner";
import { styles } from '../styles/Styles';

import * as firebase from 'firebase/app';
import "firebase/storage";
import defaultImage from '../../assets/logo-icon.png';
import CourseSectionList from "../components/CourseSectionList";

const JUMP_IN_MILLISECONDS = 30000;

const Course = ({route}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [isVideoError, setIsVideoError] = useState(false);
  // These must be initialized to null due to the way if conditions are written throughout.

  const video = useRef(null);
  const [videoStatus, setVideoStatus] = useState(null);

  const item = route.params;
  const theContentID = item.contentID;

  useEffect(() => {

    const fetchList = async () => {
      const dbh = firebase.firestore();
      
      dbh.collection("courseSections").orderBy('date').get()
      .then((querySnapshot) => {

        console.log("Snapshot size:" + querySnapshot.size)

        if (querySnapshot.size == 0) {
          setIsLoaded(true);
        }
        else {
          let countCourses = 0;
      
          querySnapshot.forEach((doc) => {
            let newDoc = doc.data();
            newDoc.contentID = doc.id;

            const courseRef = newDoc.course.id;          
    
            // https://firebase.google.com/docs/storage/web/download-files
            let storage = firebase.storage();
            let pathReference = storage.ref(newDoc.title);

            console.log("PATH REF IS: " + pathReference);
            
           if(courseRef == theContentID){
             
              countCourses++;
              console.log("ADDED DATE" + newDoc.date.toDate());

              setData(oldList => [...oldList, newDoc]);

            }

            if(countCourses == item.numSections){

              setIsLoaded(true);
              
            }
          
          })
        }
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
    };
  
    fetchList();  
  }, []);








  const playbackStatusUpdateCallback = (playbackStatus) => {
    // Don't try to update the status if not loaded anymore.
    // Unloaded video means user left the screen, so state variables cannot be updated anymore.
    if (playbackStatus.isLoaded) {
      setVideoStatus(playbackStatus);
      setIsBuffering(playbackStatus.isBuffering);

      // After finishing, stopAsync() brings it back to the beginning and makes it paused.
      if (playbackStatus.didJustFinish) {
        video.current.stopAsync();
        setIsPlaying(false);
      }
    }
  };

  const setupVideo = async () => {
    if (!item.videoPath) {
      Alert.alert(
        "Error Getting Video",
        "There was an error when retrieving the video.current.",
        [
          {text: "OK"}
        ]
      );
      setIsVideoError(true);
      setIsLoaded(true);
    }
    else {
      const dbh = firebase.firestore();
      // https://firebase.google.com/docs/storage/web/download-files
      let storage = firebase.storage();
      let pathReference = storage.ref(item.videoPath);
      pathReference.getDownloadURL()
      .catch((error) => {
        Alert.alert(
          "Error Getting Video",
          "There was an error when retrieving the video.current.",
          [
            {text: "OK"}
          ]
        );
        setIsVideoError(true);
        setIsLoaded(true);
      })
      .then(async (url) => {
        // Adapted from: https://ndpniraj.com/play-pause-resume-audio-from-remote-api-react-native-expo/
        if (video.current !== null && videoStatus === null) {
          const status = await video.current.loadAsync(
            { uri: url },
            { shouldPlay: false }
          );
          setIsPlaying(false);
          return setVideoStatus(status);
        }
      });
    }
  };

  // Adapted from: https://ndpniraj.com/play-pause-resume-audio-from-remote-api-react-native-expo/
  useEffect(() => {
    setupVideo();

    // For unloading the sound when exiting page
    // Need to put sound in the [], too
    // Code from: https://docs.expo.io/versions/latest/sdk/audio/
    return videoStatus !== null && !isVideoError
    ? () => { video.current.unloadAsync(); }
    : undefined;
  }, [video]);

  const quickForward = async () => {
    if (videoStatus !== null) {
      let newPos = videoStatus.positionMillis + JUMP_IN_MILLISECONDS;
      if (videoStatus.durationMillis < newPos) {
        await video.current.setPositionAsync(videoStatus.durationMillis);
      }
      else {
        await video.current.setPositionAsync(newPos);
      }
    }
  };

  const quickBackward = async () => {
    if (videoStatus !== null) {
      let newPos = videoStatus.positionMillis - JUMP_IN_MILLISECONDS;
      if (newPos < 0) {
        await video.current.setPositionAsync(0);
      }
      else {
        await video.current.setPositionAsync(newPos);
      }
    }
  };

  const playPause = async () => {
    if (videoStatus !== null) {
      // Adapted from: https://ndpniraj.com/play-pause-resume-audio-from-remote-api-react-native-expo/
      // It will pause our video
      if (videoStatus.isPlaying) {
        const status = await video.current.pauseAsync();
        setIsPlaying(false);
        return setVideoStatus(status);
      }
  
      // It will resume our video
      if (!videoStatus.isPlaying) {
        const status = await video.current.playAsync();
        setIsPlaying(true);
        return setVideoStatus(status);
      }
    }
  };

  const goToPosition = async (position) => {
    if (videoStatus !== null) {
      await video.current.setPositionAsync(position * 1000);
    }
  };

  return (

    <View style={styles.app}>
      <View style={styles.fullWidthWindow}>
        <View style={styles.floatingActionView}>
          { isVideoError ?
            <Image source={{ uri: item.imagePath ? item.imagePath : Image.resolveAssetSource(defaultImage).uri }} style={styles.coursePhoto} />
          :
            <Video
              ref={video}
              posterSource={{
                uri: item.imagePath
              }}
              usePoster={true}
              style={styles.courseVideo}
              resizeMode={Video.RESIZE_MODE_CONTAIN}
              onPlaybackStatusUpdate={playbackStatusUpdateCallback}
              onLoad={() => { setIsLoaded(true)} }
            />
          }
          <SetFeatured firebaseCollectionName="courses" item={item} />
          
          { /* Don't show the controls if the video is buffering or still loading in. */ }
          
          { isBuffering || !isLoaded ? <Text style={styles.bufferingText}>Buffering...</Text> : null}
          <Text style={styles.contentTitle}>{item.title}</Text>
          { isBuffering || !isLoaded ? null :
            <View style={styles.sliderAndController}>
                <PlayerSlider currentValue={videoStatus ? videoStatus.positionMillis / 1000 : 0} setCurrentValue={(position) => goToPosition(position)} duration={item.duration}/>
                <Controller isPlaying={isPlaying} quickForward={quickForward} quickBackward={quickBackward} playPause={playPause} />
            </View> 
          }
          <ScrollView style={styles.contentDescriptionSpacer}>
            <Text style={styles.contentDesc}>{item.description}</Text>
           
            <CourseSectionList 
               contentComponent="CourseSection"
               navigation={navigation}
               contentType="courseSections"
               data={data.sort((docA, docB) => docB.dateAdded - docA.dateAdded)} />
        
          </ScrollView>

        
        </View>
      </View>
    </View>
  );
};

export default Course;
