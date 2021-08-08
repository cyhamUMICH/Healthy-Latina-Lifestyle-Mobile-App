import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { styles } from '../styles/Styles';
import ContentList from '../components/ContentList';
import LoadingSpinner from '../components/LoadingSpinner';
import * as firebase from 'firebase/app';
import "firebase/firestore";
import "firebase/storage";

const MeditationList = (props) => {
  const [data, setData] = useState([]);           
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchList = async () => {
      const dbh = firebase.firestore();
      dbh.collection("meditations").get()
      .then((querySnapshot) => {

        if (querySnapshot.size == 0) {
          setIsLoaded(true);
        }
        else {
          let countImages = 0;
          querySnapshot.forEach((doc) => {
            let newDoc = doc.data();
            newDoc.contentID = doc.id;
            
            // https://firebase.google.com/docs/storage/web/download-files
            let storage = firebase.storage();
            let pathReference = storage.ref(newDoc.imagePath);
            pathReference.getDownloadURL()
            .then((url) => {
              newDoc.imagePath = url;
            })
            .catch((error) => {
              newDoc.imagePath = "";
            })
            .finally(() => {
              // Add to the data list once the image has been resolved
              setData(oldList => [...oldList, newDoc]);
              
              countImages++;

              // Data is loaded once the number of images is the same as
              // the number in the snapshot
              if (querySnapshot.size === countImages) {
                setIsLoaded(true);
              }
            });
          })
        }
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
    };
  
    fetchList();  
  }, []);

  return (
  
    <View style={styles.app}>
    {
      isLoaded ? 
        <ContentList 
          contentComponent="Meditation"
          navigation={props.navigation}
          contentType="Meditations"
          data={data.sort((docA, docB) => docB.dateAdded - docA.dateAdded)}
          filterBy="Difficulty,Language,Topic,Duration" />
        : <LoadingSpinner />
    }
    </View>
  );
};

export default MeditationList;