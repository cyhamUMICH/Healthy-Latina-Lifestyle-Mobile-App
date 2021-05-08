import React, { useRef, useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  Text,
  Image,
  FlatList,
  Dimensions,
  Animated,
  StyleSheet,
} from "react-native";

import Controller from "../components/Controller";
import MySlider from "../components/MySlider";
import Slider from "../components/MySlider";

const { width, height } = Dimensions.get("window");

const data = [
  {
    contentID: '1',
    title: 'Control Your Breathing and Fall Asleep',
    imagePath: require('../../assets/temporary/Meditation1.png'),
    desc: 'This is the first meditation.',
  },
  {
    contentID: '2',
    title: 'Relajarse y Recargar',
    imagePath: require('../../assets/temporary/Meditation2.png'),
    desc: 'Esta es la segunda meditación.',
  },
  {
    contentID: '3',
    title: 'Explore Your Thinking',
    imagePath: require('../../assets/temporary/Meditation3.png'),
    desc: 'This is the third meditation.',
  },
];

export default function Meditation() {
  const scrollX = useRef(new Animated.Value(0)).current;

  const slider = useRef(null);
  const [songIndex, setSongIndex] = useState(0);

  // for tranlating the album art
  const position = useRef(Animated.divide(scrollX, width)).current;

  useEffect(() => {
    // position.addListener(({ value }) => {
    //   console.log(value);
    // });

    scrollX.addListener(({ value }) => {
      const val = Math.round(value / width);

      setSongIndex(val);

      // little buggy
      //if previous index is not same then only update it
      // if (val !== songIndex) {
      //   setSongIndex(val);
      //   console.log(val);
      // }
    });

    return () => {
      scrollX.removeAllListeners();
    };
  }, []);

  const goNext = () => {
    slider.current.scrollToOffset({
      offset: (songIndex + 1) * width,
    });
  };
  const goPrv = () => {
    slider.current.scrollToOffset({
      offset: (songIndex - 1) * width,
    });
  };

  const renderItem = ({ index, item }) => {
    return (
      <Animated.View
        style={{
          alignItems: "center",
          width: width,
          transform: [
            {
              translateX: Animated.multiply(
                Animated.add(position, -index),
                -100
              ),
            },
          ],
        }}
      >
        <Animated.Image
          source={item.imagePath}
          style={{ width: 320, height: 320, borderRadius: 5 }}
        />
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={{ height: 320 }}>
        <Animated.FlatList
          ref={slider}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true }
          )}
        />
      </SafeAreaView>
      <View>
        <Text style={styles.title}>{data[songIndex].title}</Text>
      </View>

      <MySlider />
      
      <Controller onNext={goNext} onPrv={goPrv} />
      <Text style={styles.desc}>{data[songIndex].desc}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    textAlign: "center",
    textTransform: "capitalize",
  },
  desc: {
    fontSize: 18,
    textAlign: "center",
    textTransform: "capitalize",
  },
  container: {
    justifyContent: "space-evenly",
    height: height,
    maxHeight: 500,
  },
});




// import { useLinkProps } from '@react-navigation/native';
// import React from 'react';
// import { Button } from 'react-native-elements';
// import { View, Text } from 'react-native';
// import { styles } from '../styles/Styles';
// import { Image } from 'react-native';
// import { TouchableOpacity } from 'react-native-gesture-handler';

// //https://around25.com/blog/how-to-create-a-simple-music-player-with-react-native/

// const Meditation = (props) => {

//   return (
//     <View style={styles.app}>

//     <Image 
//       source={require('../../assets/temporary/Meditation1.png')} 
//       style={styles.meditationPhoto}
//       />
    

    
//       <TouchableOpacity
      
//         style={styles.playButton}>
//       <Image 
//       source={require('../../assets/play_button.png')} 
//       style={styles.playPhoto}
//       />

//         </TouchableOpacity>


//       {/* <Image 
//       source={require('../../assets/play_button.png')} 
//       style={styles.playPhoto}
//       /> */}
      

//         <View style={{top: 50}}>
//         <Text>Listen and relax</Text>
//       </View>



//     </View>
//   );
// };

// export default Meditation;