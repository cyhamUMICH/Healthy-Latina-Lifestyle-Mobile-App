import React from 'react'
import Slider from '@react-native-community/slider'

import { StyleSheet, Text, View} from 'react-native'

export default function MySlider(){
    return(
        <View>
            <Slider
            style={{Width: 200, height: 10}}
            minimumValue={0}
            maximumValue={1}
            minimumTrackTintColor="#967EDA"
            maximumTrackTintColor="000000"
            />
        </View>
    )
}

const styles = StyleSheet.create({})