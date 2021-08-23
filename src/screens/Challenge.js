import React, { useState, useEffect } from "react";
import { View, Text, Image } from "react-native";
import Tags from '../components/Tags';
import { styles } from '../styles/Styles';
import SetFeatured from "../components/SetFeatured";
import LoadingSpinner from '../components/LoadingSpinner';
import * as firebase from 'firebase/app';
import "firebase/firestore";
import "firebase/storage";
import ChallengeDayList from '../components/ChallengeDayList';
import defaultImage from '../../assets/logo-icon.png';

const printDate = (date) => {
  if (date) {
    // Add one since getMonth() gives the month index
    let month = date.getMonth() + 1;
  
    return month + '/' + date.getDate() + '/' + date.getFullYear();
  }
};

// Copied from: https://stackoverflow.com/questions/3224834/get-difference-between-2-dates-in-javascript
const getDuration = (startDate, endDate) => {
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
  const utc2 = Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
  return Math.floor((utc2 - utc1) / (1000 * 60 * 60 * 24)) + 1;
};

const Challenge = ({route}, props) => {
  
  const item = route.params.item;
  const navigation = route.params.navigation;
  
  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const theStartDate = printDate(item.startDate.toDate());
  const theEndDate = printDate(item.endDate.toDate());
  const duration = getDuration(item.startDate.toDate(), item.endDate.toDate());

  useEffect(() => {

    const fetchList = async () => {
      const dbh = firebase.firestore();
      
      dbh.collection("challengeDays").where("challengeID", "==", item.contentID).get()
      .then((querySnapshot) => {

        if (querySnapshot.size == 0) {
          setIsLoaded(true);
        }
        else {
          let count = 0;
          querySnapshot.forEach((doc) => {
            let newDoc = doc.data();
            newDoc.contentID = doc.id;
            
            setData(oldList => [...oldList, newDoc]);
            count++;

            if (querySnapshot.size === count) {
              setIsLoaded(true);
            }
          });
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
         <View style={styles.fullWidthWindow}>
           <View style={styles.floatingActionView}>
             <Image source={{ uri: item.imagePath ? item.imagePath : Image.resolveAssetSource(defaultImage).uri }}
               style={styles.challengePhoto}></Image>
             <SetFeatured firebaseCollectionName="challenges" item={item} />
             <Tags difficulty={item.difficulty} topics={item.topics}></Tags>
             <Text style={styles.contentTitle}>{item.title}</Text> 
             <Text style={styles.contentDesc}>{item.description}{"\n"}</Text>
             <Text>Challenge starts on: {theStartDate}.</Text>
             <Text>Challenge ends on: {theEndDate}.</Text>
             <Text>This challenge is {duration} day(s) long.</Text>
             <ChallengeDayList 
               contentComponent="ChallengeDay"
               navigation={navigation}
               contentType="challengeDays"
               data={data.sort((docA, docB) => docA.date - docB.date)} />
           </View>
         </View>
         : <LoadingSpinner />
     }
     </View>
 
  );
};

export default Challenge;
