import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import { useIsFocused } from "@react-navigation/native";
import { styles } from '../styles/Styles';
import { colors } from '../styles/Colors';
import FilterModal from '../components/ContentFilter';
import ShareContentGroupSelector from './ShareContentGroupSelector';
import { GetTopics } from '../components/GetTopics';
import Tags from '../components/Tags';
import LoadingSpinner from '../components/LoadingSpinner';
import defaultImage from '../../assets/logo-icon.png';
import * as firebase from 'firebase/app';
import "firebase/firestore";
import "firebase/storage";

const ContentCards = (props) => {

  return (
    (props.filteredList.length != 0) 
    ? <FlatList 
        style={props.style}
        data={props.filteredList}
        renderItem={(item) => ContentCard(item, props.contentComponent, props.navigation, props.shareContent)}
        keyExtractor={item => item.contentID} /> 
    : <Text style={styles.noContent}>No {props.contentType} Match Your Search</Text>
  );
};

const ContentCard = ({item}, contentComponent, navigation, shareContent) => {
  // Convert seconds to HH:MM:SS, then remove HH if 00
  // https://stackoverflow.com/questions/1322732/convert-seconds-to-hh-mm-ss-with-javascript

  let duration;
  if (item.duration){
    duration = new Date(item.duration * 1000).toISOString().substr(11, 8);
    duration = (duration.substr(0, 2) == "00") ? duration.substr(3) : duration;
  }

  return (

  
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => {
        // Add any content that will require another layer of navigation to this if condition.
        if(contentComponent === "Challenge" || contentComponent === "Course") {
          navigation.navigate(contentComponent, {
            item: item,
            navigation: navigation
          });
        }
        else {
          navigation.navigate(contentComponent, item);
        }
      }}>
      <Card containerStyle={styles.card}>
        <Card.Image source={{ uri: item.imagePath ? item.imagePath : Image.resolveAssetSource(defaultImage).uri }}
          style={styles.cardImage}>
          {item.duration && <Text style={styles.duration}>{duration}</Text>}
        </Card.Image>
        <Tags difficulty={item.difficulty} topics={item.topics}></Tags>
        <Card.Divider/>
        <View style={styles.horizontalButtonLayout}>
          <View style={styles.cardTitleView}>
            <Card.Title style={styles.cardTitle}>{item.title}</Card.Title>
          </View>
          <View>
            <TouchableOpacity onPress={() => {shareContent(item);}}>
              <Icon name="send" type="font-awesome" color={colors.text} />
            </TouchableOpacity>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
    
  );
};

const ContentList = (props) => {
  const isFocused = useIsFocused();

  const [isTopicsLoaded, setIsTopicsLoaded] = useState(false);
  const [topicsList, setTopicsList] = useState([]);
  const [groupsLoaded, setIsGroupsLoaded] = useState(false);
  const [groupsList, setGroupsList] = useState([]);
  const [sendItem, setSendItem] = useState(null);
  const [groupsModalVisible, setGroupsModalVisible] = useState(false);
  const [admin, setAdmin] = useState(false);

  const fetchUsersGroups = () => {
    return new Promise((resolve, reject) => {
      const dbh = firebase.firestore();
      dbh.collection("Users").doc(firebase.auth().currentUser.uid).get()
      .then((doc) => {
        if (doc.exists) {
          if (doc.data().GroupID && doc.data().GroupID.length !== 0) {
            resolve(doc.data().GroupID);
          }
        } 
        else {
          reject("Error retrieving the user data.");
        }
      })
      .catch((error) => {
        reject("Error retrieving the data: " + error);
      });
    });
  };
  
  const fetchRooms = (usersGroups) => {
    return new Promise((resolve, reject) => {
      const dbh = firebase.firestore();
      // Code from: https://stackoverflow.com/questions/62524946/firestore-check-if-id-exists-against-an-array-of-ids
      dbh.collection("Groups").where(firebase.firestore.FieldPath.documentId(), "in", usersGroups)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.size > 0) {
          let groupsArray = [];
          querySnapshot.forEach((doc) => {
            let newDoc = doc.data();
            newDoc._id = doc.id;
            groupsArray.push(newDoc);
          });
          resolve(groupsArray);
        }
      })
      .catch((error) => {
        reject("Error retrieving the data: " + error);
      })
      .finally(() => {
        setIsGroupsLoaded(true);
      });
    });
  };  

  const GetGroups = async () => {
    setIsGroupsLoaded(false);
    await fetchUsersGroups()
    .then((userGroups) => {
      fetchRooms(userGroups)
      .then((groupsArray) => {
        setGroupsList(groupsArray);
      })
      .catch((error) => {
        Alert.alert(
          "Error Sharing Content",
          "An error has occurred, and you will not be able to share content. " + error,
          [
            {text: "OK"}
          ]
        );
      });
    })
    .catch((error) => {
      Alert.alert(
        "Error Sharing Content",
        "An error has occurred, and you will not be able to share content. " + error,
        [
          {text: "OK"}
        ]
      );
    });
  };

  const shareContent = (item) => {
    let contentCollection;
    let contentTypeSingular;
    switch (props.contentType.toLowerCase()) {
      case 'meditations': 
        contentCollection = 'meditations';
        contentTypeSingular = 'meditation';
        break;
      case 'challenges': 
        contentCollection = 'challenges'; 
        contentTypeSingular = 'challenge';
        break;
      case 'courses': 
        contentCollection = 'courses'; 
        contentTypeSingular = "course";
        break;
      case 'yoga videos': 
        contentCollection = 'yoga'; 
        contentTypeSingular = "yoga video";
        break;
      case 'podcasts': 
        contentCollection = 'podcasts'; 
        contentTypeSingular = "podcast";
        break;
      case 'journal prompts': 
        contentCollection = 'journalPrompts';
        contentTypeSingular = "journal prompt";
        break;
      default: contentCollection = ""; contentTypeSingular = "";
    }

    if (contentCollection == "") {
      Alert.alert(
        "Error Sharing Content",
        "An error has occurred. You cannot share this content. " + error,
        [
          {text: "OK"}
        ]
      );
    }
    else {
      setSendItem({
        item: item,
        contentType: contentTypeSingular,
        contentCollection: contentCollection,
        contentComponent: props.contentComponent
      });
      setGroupsModalVisible(true);
    }
  };

  useEffect(() => {
    GetTopics(setIsTopicsLoaded, setTopicsList);
    const loadAdmin = async () =>{
      var user = firebase.auth().currentUser
        if (user) {
          await firebase.firestore().collection('Users').doc(user.uid).get()
            .then(documentSnapshot => getAdmin(documentSnapshot))
            .then(admin => setAdmin(admin));
        }
        else {
          setAdmin(false);
        }
    };
    
    const getAdmin = (documentSnapshot) =>{
      return documentSnapshot.get('admin');
    };

    loadAdmin();
  }, []);

  useEffect(() => {
    if (isFocused) {
      GetGroups();
    }
  }, [isFocused]);

  const [filteredList, setFilteredList] = useState(props.data);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [filterSettings, setFilterSettings] = useState({
    difficultyFilter: [],
    languageFilter: [],
    topicFilter: [],
    durationFilter: []
  });
  const filterBy = props.filterBy.split(',');

  return (
    isTopicsLoaded ? 
    <View style={styles.fullWidthWindow}>
      <View style={styles.floatingActionView}>
        <Button 
          buttonStyle={styles.button}
          titleStyle={styles.buttonText}
          title="Filter"
          onPress={() => {
            setFilterModalVisible(true);
          }}></Button>
        <ContentCards 
          style={styles.cardList} 
          contentType={props.contentType}
          filteredList={filteredList}
          contentComponent={props.contentComponent}
          navigation={props.navigation} 
          shareContent={shareContent} />
        <FilterModal
          allData={props.data}
          topicsList={topicsList}
          filterBy={filterBy}
          visibleFunction={setFilterModalVisible}
          visible={filterModalVisible}
          filterSettingsFunction={setFilterSettings}
          filterSettings={filterSettings}
          filteredListFunction={setFilteredList}
          filteredList={filteredList}/>
        <ShareContentGroupSelector
          visibleFunction={setGroupsModalVisible}
          visible={groupsModalVisible}
          groupsList={groupsList} 
          sendItem={sendItem} />
          {admin &&
        <TouchableOpacity style={styles.floatingActionButtonBottomRight} 
          onPress={() => props.navigation.navigate("Add".concat(props.contentComponent), {
            topics: topicsList, 
            navigation: props.navigation
            })}>
          <View style={styles.floatingActionIcon}>
            <Icon name="plus" type="font-awesome" color={colors.text} />
          </View>
        </TouchableOpacity>
        }
      </View>
    </View>
    : <LoadingSpinner />
  );
};

export default ContentList;