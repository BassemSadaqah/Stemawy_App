import React,{useState,useContext,useEffect} from 'react';
import {View,Text} from 'react-native'
import StackHeader from '../components/StackHeader'
function Settings({navigation}) {
    return (
        <View>
            <StackHeader navigation={navigation} title='Settings'/>
            <Text>
                Settings
            </Text>
        </View>
    )
}

export default Settings
