import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import { styles } from '../styles/Styles';
import { colors } from '../styles/Colors';
import FilterModal from '../components/ContentFilter';
import { GetTopics } from '../components/GetTopics';
import Tags from '../components/Tags';
import LoadingSpinner from '../components/LoadingSpinner';
import { Drawer } from 'react-native-paper';
import { Groups } from '../screens/Groups';
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
        renderItem={(item) => ContentCard(item, props.contentComponent, props.navigation)}
        keyExtractor={item => item.contentID} /> 
    : <Text style={styles.noContent}>No {props.contentType} Match Your Search</Text>
  );
};

const ContentCard = ({item}, contentComponent, navigation) => {

  console.log("the content component for all" + contentComponent)
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
          <View>
            <Card.Title style={styles.cardTitle}>{item.title}</Card.Title>
          </View>
          <View>


            <TouchableOpacity onPress={() => {navigation.navigate("ChatRoomHome", item)}}>
              <Icon name="send" type="font-awesome" color={colors.text} />
            </TouchableOpacity>


          </View>
        </View>
      </Card>
    </TouchableOpacity>
    
  );
};

const ContentList = (props) => {
  const [isTopicsLoaded, setIsTopicsLoaded] = useState(false);
  const [topicsList, setTopicsList] = useState([]);
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    GetTopics(setIsTopicsLoaded, setTopicsList);
    const loadAdmin = async () =>{
                var user = firebase.auth().currentUser
                await firebase.firestore().collection('Users').doc(user.uid).get()
                .then(documentSnapshot => getAdmin(documentSnapshot))
                .then(admin => setAdmin(admin))

                }


                const getAdmin = (documentSnapshot) =>{
                return documentSnapshot.get('admin');

                }

            loadAdmin();
  }, []);

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
          navigation={props.navigation} />
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