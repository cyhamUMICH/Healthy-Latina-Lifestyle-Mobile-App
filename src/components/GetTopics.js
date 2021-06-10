import * as firebase from 'firebase/app';
import "firebase/firestore";

export function GetTopics(setIsTopicsLoaded, setTopicsList) 
{
  const fetchTopicsList = async () => {
    const dbh = firebase.firestore();
    dbh.collection("topics").get()
    .then((querySnapshot) => {
  
      if (querySnapshot.size == 0) {
        setIsTopicsLoaded(true);
      }
      else {
        let countTopics = 0;
        querySnapshot.forEach((doc) => {
          // Add to the topic list
          setTopicsList(oldList => [...oldList, doc.data().name]);
          countTopics++;
  
          // Data is loaded once all topics are in the list
          if (querySnapshot.size === countTopics) {
            setIsTopicsLoaded(true);
          }
        })
      }
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    })
  };

  fetchTopicsList();
};