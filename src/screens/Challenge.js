import React, { useState, useEffect } from "react";
import { View, Text, Image, ScrollView, CheckBox, ButtonGroup} from "react-native";
import Controller from "../components/Controller";
import PlayerSlider from "../components/PlayerSlider";
import Tags from '../components/Tags';
import { styles } from '../styles/Styles';
import { Button } from 'react-native-elements';
import ContentList from '../components/ContentList';
import SetFeatured from "../components/SetFeatured";
import LoadingSpinner from '../components/LoadingSpinner';
import * as firebase from 'firebase/app';
import "firebase/firestore";
import "firebase/storage";
import ChallengeButtons from "../components/ChallengeDayList";
import { Checkbox } from 'react-native-paper';
import ChallengeDayList from '../components/ChallengeDayList';
import defaultImage from '../../assets/logo-icon.png';


const Challenge = ({route}, props) => {
  
  const item = route.params.item;
  const navigation = route.params.navigation;
  const theContentID = item.contentID;
  
  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const theStartDate = item.startDate.toDate().toString().slice(4, 15);
  const theEndDate = item.endDate.toDate().toString().slice(4, 15);

  useEffect(() => {

    const fetchList = async () => {
      const dbh = firebase.firestore();
      
      dbh.collection("challengeDays").orderBy('date').get()
      .then((querySnapshot) => {

        if (querySnapshot.size == 0) {
          setIsLoaded(true);
        }
        else {
          let countChallenges = 0;
      
          querySnapshot.forEach((doc) => {
            let newDoc = doc.data();
            newDoc.contentID = doc.id;

            const chalref = newDoc.challenge.id;       
    
            // https://firebase.google.com/docs/storage/web/download-files
            let storage = firebase.storage();
            let pathReference = storage.ref(newDoc.title);

           if(chalref == theContentID){
             
              countChallenges++;
        
              setData(oldList => [...oldList, newDoc]);

            }

            if(countChallenges == item.numDays){

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
             <Text>Challenge starts on: {theStartDate}</Text>
             <Text>Challenge ends on: {theEndDate}</Text>
             <Text>This challenge is {item.numDays} day(s) long {"\n"}</Text>
             <ChallengeDayList 
               contentComponent="ChallengeDay"
               navigation={navigation}
               contentType="challengeDays"
               data={data.sort((docA, docB) => docB.dateAdded - docA.dateAdded)} />
           </View>
         </View>
         : <LoadingSpinner />
     }
     </View>
 
  );
};

export default Challenge;
