import { Button,FlatList, TouchableOpacity } from 'react-native';
import React from 'react'
import { StyleSheet,Text, View,TextInput } from 'react-native';
import { useTheme } from '@react-navigation/native'

// import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';

const styles=StyleSheet.create({
    txt:{
        height:40,
        borderColor:'rgba(34,36,38,.15)',
        borderRadius:5,
        borderWidth:1, 
        fontSize:15,
        margin:5,
        padding: 8, 
        paddingLeft:17, 
    }
})
export default (props)=>{
    const { colors, dark } = useTheme()
    return(
        <TextInput
            onChangeText={props.onChange}
            placeholderTextColor={dark ? '#a1a1a1' : 'gray'} 
            {...props}
            style={{...styles.txt,...props.style}}
        />       
    )
}