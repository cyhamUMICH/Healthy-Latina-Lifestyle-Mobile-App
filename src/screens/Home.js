import React, { useEffect, useState } from 'react';
import { Icon } from 'react-native-elements';
import { useIsFocused } from "@react-navigation/native";
import { View, Text, Image, ImageBackground, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import LoadingSpinner from '../components/LoadingSpinner';
import { styles } from '../styles/Styles';
import * as firebase from 'firebase/app';
import "firebase/firestore";
import "firebase/storage";
import defaultImage from '../../assets/logo-icon.png';
import { Button } from 'react-native-elements/dist/buttons/Button';

const homeButtonsAdmin = [
  {
    name: "Timer",
    page: "SetTimer",
    iconName: "timer",
    iconType: "Ionicons"
  },
  {
    name: "Meditations",
    page: "MeditationList",
    iconName: "meditation",
    iconType: "material-community"
  },
  {
    name: "Challenges",
    page: "ChallengeList",
    iconName: "calendar",
    iconType: "font-awesome"
  },
  {
    name: "Courses",
    page: "CourseList",
    iconName: "file-video-o",
    iconType: "font-awesome"
  },
  {
    name: "Yoga Videos",
    page: "YogaList",
    iconName: "yoga",
    iconType: "material-community"
  },
  {
    name: "Podcasts",
    page: "PodcastList",
    iconName: "podcast",
    iconType: "material-community"
  },
  {
    name: "Journal Prompts",
    page: "Journal",
    iconName: "book",
    iconType: "antdesign"
  },
  {
    name: "Add Content",
    page: "AddContent",
    iconName: "addfile",
    iconType: "antdesign"
  },
];

const homeButtons = [
  {
    name: "Timer",
    page: "SetTimer",
    iconName: "timer",
    iconType: "Ionicons"
  },
  {
    name: "Meditations",
    page: "MeditationList",
    iconName: "meditation",
    iconType: "material-community"
  },
  {
    name: "Challenges",
    page: "ChallengeList",
    iconName: "calendar",
    iconType: "font-awesome"
  },
  {
    name: "Courses",
    page: "CourseList",
    iconName: "file-video-o",
    iconType: "font-awesome"
  },
  {
    name: "Yoga Videos",
    page: "YogaList",
    iconName: "yoga",
    iconType: "material-community"
  },
  {
    name: "Podcasts",
    page: "PodcastList",
    iconName: "podcast",
    iconType: "material-community"
  },
  {
    name: "Journal Prompts",
    page: "Journal",
    iconName: "book",
    iconType: "antdesign"
  },
];

const Home = (props) => {
  const isFocused = useIsFocused();

  const [meditations, setMeditations] = useState([]);
  const [challenges, setChallenges] = useState([]);
  const [courses, setCourses] = useState([]);
  const [yoga, setYoga] = useState([]);
  const [podcasts, setPodcasts] = useState([]);
  const [journalPrompts, setJournalPrompts] = useState([]);
  const [fetchStatus, setFetchStatus] = useState({
    meditations: false,
    challenges: false,
    courses: false,
    yoga: false,
    podcasts: false,
    journalPrompts: false
  });
  const [isLoaded, setIsLoaded] = useState(false);
  const [admin, setAdmin] = useState(false);
  
  const homeButton = ({item}) => {
    return(
      <View>
        <TouchableOpacity style={styles.homeRoundButton} onPress={() => props.navigation.navigate(item.page)}>
          <Icon name={item.iconName} type={item.iconType} size={styles.homeIconSize}/>
        </TouchableOpacity>
      </View>
    );
  };

  // Can't use the same react-native-elements Card because it crashes in a horizontal FlatList
  const contentRenderItem = ({item}, contentComponent, navigation) => {
    return (
      <View style={styles.homeFeaturedView}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            // Add any content that will require another layer of navigation to this if condition.
            if(contentComponent === "Challenge") {
              navigation.navigate(contentComponent, {
                item: item,
                navigation: navigation
              });
            }
            else {
              navigation.navigate(contentComponent, item);
            }
          }}>
          <ImageBackground source={{ uri: item.imagePath ? item.imagePath : Image.resolveAssetSource(defaultImage).uri }}
            style={styles.homeFeaturedImage}>
            <Text 
              numberOfLines={1}
              ellipsizeMode='tail' 
              style={styles.homeFeaturedTitle}>{item.title}</Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    );
  };

  const renderSeparatorItem = () => {
    return(
      <View style={ styles.homeItemSeparator }></View>
    );
  };

  useEffect(() => {
    const resetAll = () => {
      setIsLoaded(false);
      setMeditations([]);
      setChallenges([]);
      setCourses([]);
      setYoga([]);
      setPodcasts([]);
      setJournalPrompts([]);
      setFetchStatus({
        meditations: false,
        challenges: false,
        courses: false,
        yoga: false,
        podcasts: false,
        journalPrompts: false
      });
    };

    const fetchFeatured = async (contentType, setDataFunction) => {
      const dbh = firebase.firestore();
      dbh.collection(contentType).where("featured", "==", true).get()
      .then(async (querySnapshot) => {

        if (querySnapshot.size != 0) {
          querySnapshot.forEach(async (doc) => {
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
              setDataFunction(oldList => [...oldList, newDoc]);
            });
          })
        }
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      })
      .finally(() => {
        // From: https://www.javascripttutorial.net/es6/javascript-computed-property/
        //    Brackets around contentType make it a computed property.
        setFetchStatus(oldStatus => ({...oldStatus, [contentType]: true}));
      });
    };

    const fetchAll = async () => {
      await fetchFeatured("meditations", setMeditations);
      await fetchFeatured("challenges", setChallenges);
      await fetchFeatured("courses", setCourses);
      await fetchFeatured("yoga", setYoga);
      await fetchFeatured("podcasts", setPodcasts);
      await fetchFeatured("journalPrompts", setJournalPrompts);
    };
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
  
    if (isFocused) {
      resetAll();
      fetchAll();
    }
  }, [isFocused]);

  useEffect(() => {
    // From: https://stackoverflow.com/questions/17117712/how-to-know-if-all-javascript-object-values-are-true/49416990
    setIsLoaded(Object.values(fetchStatus).every(item => item === true));
  }, [fetchStatus]);

  return (
    <View style={styles.app}>
      {isLoaded ? 
      <View style={styles.fullWidthWindow}>
        <Image 
          source={require('../../assets/logo-icon.png')} 
          style={styles.homepageLogo} />
          {!admin &&
        <View style={styles.homeRoundButtonSection}>
          <FlatList
            horizontal={true}
            data={homeButtons}
            renderItem={homeButton}
            keyExtractor={item => item.name} 
            ItemSeparatorComponent={renderSeparatorItem} />
        </View>
        }
        {admin &&
                <View style={styles.homeRoundButtonSection}>
                  <FlatList
                    horizontal={true}
                    data={homeButtonsAdmin}
                    renderItem={homeButton}
                    keyExtractor={item => item.name}
                    ItemSeparatorComponent={renderSeparatorItem} />
                </View>
                }
        <View style={styles.homeFeaturedSection}>
          <ScrollView>
            { meditations.length > 0 ?
              <View style={styles.homeFeaturedContentTypeView}>
                <Text style={styles.cardTitle}>Meditations</Text>
                <FlatList
                  horizontal={true}
                  data={meditations.sort((docA, docB) => docB.dateAdded - docA.dateAdded)}
                  renderItem={(item) => contentRenderItem(item, "Meditation", props.navigation)}
                  keyExtractor={item => item.contentID} 
                  ItemSeparatorComponent={renderSeparatorItem} />
              </View>
              : null
            }
            { challenges.length > 0 ?
              <View style={styles.homeFeaturedContentTypeView}>
                <Text style={styles.cardTitle}>Challenges</Text>
                <FlatList
                  horizontal={true}
                  data={challenges.sort((docA, docB) => docB.dateAdded - docA.dateAdded)}
                  renderItem={(item) => contentRenderItem(item, "Challenge", props.navigation)}
                  keyExtractor={item => item.contentID}
                  ItemSeparatorComponent={renderSeparatorItem} />
              </View>
              : null
            }
            { courses.length > 0 ?
              <View style={styles.homeFeaturedContentTypeView}>
                <Text style={styles.cardTitle}>Courses</Text>
                <FlatList
                  horizontal={true}
                  data={courses.sort((docA, docB) => docB.dateAdded - docA.dateAdded)}
                  renderItem={(item) => contentRenderItem(item, "Course", props.navigation)}
                  keyExtractor={item => item.contentID}
                  ItemSeparatorComponent={renderSeparatorItem} />
              </View>
              : null
            }
            { yoga.length > 0 ?
              <View style={styles.homeFeaturedContentTypeView}>
                <Text style={styles.cardTitle}>Yoga Videos</Text>
                <FlatList
                  horizontal={true}
                  data={yoga.sort((docA, docB) => docB.dateAdded - docA.dateAdded)}
                  renderItem={(item) => contentRenderItem(item, "Yoga", props.navigation)}
                  keyExtractor={item => item.contentID}
                  ItemSeparatorComponent={renderSeparatorItem} />
              </View>
              : null
            }
            { podcasts.length > 0 ?
              <View style={styles.homeFeaturedContentTypeView}>
                <Text style={styles.cardTitle}>Podcasts</Text>
                <FlatList
                  horizontal={true}
                  data={podcasts.sort((docA, docB) => docB.dateAdded - docA.dateAdded)}
                  renderItem={(item) => contentRenderItem(item, "Podcast", props.navigation)}
                  keyExtractor={item => item.contentID}
                  ItemSeparatorComponent={renderSeparatorItem} />
              </View>
              : null
            }
            { journalPrompts.length > 0 ?
              <View style={styles.homeFeaturedContentTypeView}>
                <Text style={styles.cardTitle}>Journal Prompts</Text>
                <FlatList
                  horizontal={true}
                  data={journalPrompts.sort((docA, docB) => docB.dateAdded - docA.dateAdded)}
                  renderItem={(item) => contentRenderItem(item, "Journal", props.navigation)}
                  keyExtractor={item => item.contentID}
                  ItemSeparatorComponent={renderSeparatorItem} />
              </View>
              : null
            }
          </ScrollView>
        </View>
      </View>
      : <LoadingSpinner />
    }
    </View>
  );
};

export default Home;