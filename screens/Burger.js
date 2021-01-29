import React,{useState,useContext,useEffect} from 'react';
import Button from '../components/Button'
import {View,Text,ScrollView,StyleSheet,TouchableOpacity} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useApolloClient } from '@apollo/client';
import {userContext} from '../App'


const styles=StyleSheet.create({
    main:{
        marginTop:10
    },
    btn:{
        height:60,
        backgroundColor:'white',
        borderRadius:10,
        display:'flex',
        alignItems:'flex-start',
        justifyContent:'center',
        padding:20,
        margin:4,
    },
    txt:{
        fontSize:20,
        fontWeight:'700',

    }
})
function Btn(props){
    return(
    <TouchableOpacity style={styles.btn} {...props}>
        <Text style={styles.txt}>{props.children}</Text>
    </TouchableOpacity>
)}
function logout(setUser,client){
        AsyncStorage.removeItem('accessToken')
        setUser({isSigned:false})
        client.clearStore()
}
function Settings({navigation}) {
    const client = useApolloClient();
    const {user,setUser} = useContext(userContext)

    return (
        <ScrollView style={styles.main}>
           <Btn onPress={()=>navigation.jumpTo('MyProfile')}>Profile</Btn>
           <Btn>Settings</Btn>
           <Btn onPress={()=>logout(setUser,client)}>Logout</Btn>
           <Btn>Logout</Btn>
        </ScrollView>
    )
}

export default Settings
