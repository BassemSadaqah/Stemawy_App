import React, { useState, useContext, useEffect } from 'react';
import Button from '../components/Button'
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Switch } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon5 from 'react-native-vector-icons/FontAwesome5';

import { useApolloClient } from '@apollo/client';
import { userContext } from '../App'
import { ThemeContext } from '../components/Navigation'
import { useTheme } from '@react-navigation/native';




function Settings({ navigation,route }) {
    const { colors } = useTheme()
    const client = useApolloClient();
    const { user, setUser } = useContext(userContext)
    const { isThemeDark, toggleTheme } = useContext(ThemeContext)
    const styles = StyleSheet.create({
        main: {
            // marginTop: 10, 
            // backgroundColor: 'white',
            // backgroundColor: 'white',
        },
        btn: {
            height: 60,
            backgroundColor: colors.card,
            borderRadius: 10,
            display: 'flex',
            flexDirection: "row",
            alignItems: 'center',
            justifyContent: 'flex-start',
            padding: 20,
            marginBottom: 7,
            marginVertical: 4,
            marginHorizontal: 10,
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
            marginRight: 20,
            color: colors.text,
        },
        txt: {
            fontSize: 20,
            fontWeight: '700',
            marginRight: 20,
            color:colors.text,
        },
        switch: {
            width: 20,
            marginLeft: 15,
        }, dark: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            flex: 1
        }
    })
    function Btn(props) {
        return (
            <TouchableOpacity style={styles.btn} {...props}>
                <Icon name={props.icon} size={24} style={styles.icon} />
                <Text style={styles.txt}>{props.children}</Text>
            </TouchableOpacity>
        )
    }
    function logout(setUser, client) {
        AsyncStorage.removeItem('accessToken')
        setUser({ isSigned: false })
        client.clearStore()
    }
    return (
        <ScrollView style={styles.main}>
            <Btn icon="home" onPress={() => navigation.jumpTo('Home')}>Home</Btn>
            <Btn icon="user" onPress={() => navigation.jumpTo('MyProfile')}>Profile</Btn>
            <Btn icon="trophy" onPress={() => navigation.jumpTo('Leaderboard')}>Leaderboard</Btn>
            <Btn icon="upload" onPress={() => navigation.jumpTo('Upload')}>Upload a question</Btn>
            <Btn icon="gear" onPress={() => { navigation.navigate('Settings') }}>Settings</Btn>
            <TouchableOpacity onPress={() =>{toggleTheme(!isThemeDark)}} style={styles.btn} >
                {/* <Icon name='moon-o' color='black' size={24} style={styles.icon} /> */}
                <Icon5 name='moon' color='black' size={24} style={styles.icon} />
                <View style={styles.dark}>
                    <Text style={styles.txt} >Dark Mode</Text>
                    <Switch
                        // style={styles.switch}
                        style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
                        // width={15}
                        trackColor={{ false: "#767577", true: "#555555" }}
                        thumbColor={isThemeDark ? "#212121" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={() => toggleTheme(e => !e)}
                        value={isThemeDark} />
                </View>
            </TouchableOpacity>
            <Btn icon='sign-out' onPress={() => logout(setUser, client)}>Logout</Btn>
        </ScrollView>
    )
}

export default Settings
