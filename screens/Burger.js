import React, { useState, useContext, useEffect } from 'react';
import Button from '../components/Button'
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Icon from 'react-native-vector-icons/FontAwesome';

import { useApolloClient } from '@apollo/client';
import { userContext } from '../App'


const styles = StyleSheet.create({
    main: {
        // marginTop: 10, 
        // backgroundColor: 'white',
        backgroundColor:'white',
    },
    btn: {
        height: 60,
        backgroundColor: 'white',
        borderRadius: 10,
        display: 'flex',
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 20,
        marginBottom:7,
        marginVertical: 4,
        marginHorizontal:10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,       
        // borderBottomWidth:0.5,
        // borderBottomColor:'grey'
    },
    icon: {
        marginRight: 20
    },
    txt: {
        fontSize: 20,
        fontWeight: '700',

    }
})
function Btn(props) {
    return (
        <TouchableOpacity style={styles.btn} {...props}>
            <Icon name={props.icon} size={24} className={styles.icon} style={styles.icon} />
            <Text style={styles.txt}>{props.children}</Text>
        </TouchableOpacity>
    )
}
function logout(setUser, client) {
    AsyncStorage.removeItem('accessToken')
    setUser({ isSigned: false })
    client.clearStore()
}
function Settings({ navigation }) {
    const client = useApolloClient();
    const { user, setUser } = useContext(userContext)

    return (
        <ScrollView style={styles.main}>
            <Btn icon="home" onPress={() => navigation.jumpTo('Home')}>Home</Btn>
            <Btn icon="user" onPress={() => navigation.jumpTo('MyProfile')}>Profile</Btn>
            <Btn icon="trophy" onPress={() => navigation.jumpTo('Leaderboard')}>Leaderboard</Btn>
            <Btn icon="upload" onPress={() => navigation.jumpTo('Upload')}>Upload a question</Btn>
            <Btn icon="gear" onPress={()=>{navigation.navigate('Settings')}}>Settings</Btn>
            <Btn icon='sign-out' onPress={() => logout(setUser, client)}>Logout</Btn>
        </ScrollView>
    )
}

export default Settings
