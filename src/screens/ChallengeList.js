import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { styles } from '../styles/Styles';
import ContentList from '../components/ContentList';
import LoadingSpinner from '../components/LoadingSpinner';
import * as firebase from 'firebase/app';
import "firebase/firestore";
import "firebase/storage";
import ChallengeDayList from '../components/ChallengeDayList';

const ChallengeList = (props) => {
  const [data, setData] = useState([]);           
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchList = async () => {
      const dbh = firebase.firestore();
      dbh.collection("challenges").get()
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
              newDoc.imagePath = "https://healthylatinalifestylecom.files.wordpress.com/2017/10/cropped-cropped-peackcock-color-healthy-latino-20171.jpg";
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
          contentComponent="Challenge"
          navigation={props.navigation}
          contentType="Challenges"
          data={data.sort((docA, docB) => docB.dateAdded - docA.dateAdded)}
          filterBy="Difficulty,Language,Topic" />
        : <LoadingSpinner />
    }
    </View>
  );
};

export default ChallengeList;