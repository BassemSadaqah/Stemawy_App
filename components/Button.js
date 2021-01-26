import { Button,FlatList, TouchableOpacity } from 'react-native';
import React from 'react'
import { StyleSheet,Text, View } from 'react-native';
// import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';

export default (props)=>{
    var styles=StyleSheet.create({
        btn:{
            height:42,
            display:'flex',
            flexDirection:'column',
            justifyContent:'center',
            alignItems:'center',
            borderRadius:7,
            backgroundColor: '#3498ff',
            borderWidth:0,
            borderColor:'grey',
            color:'blue',
            margin:5,
            paddingLeft:30,
            paddingRight:30
        },
        txt:{
            color:'white',
            fontSize:17
        }
    })
    return(
    <TouchableOpacity {...props} style={{...styles.btn,...props.style}} >
        <Text  style={{...styles.txt,...props.text_style}}>{props.children}</Text>
    </TouchableOpacity> 
    )
}