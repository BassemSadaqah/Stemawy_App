import React, { useState, useEffect, createContext, useContext } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, ToastAndroid } from 'react-native';
import Signin from '../screens/Signin'
import Signup from '../screens/Signup'
import FeedTabs from '../screens/FeedTabs'
import Profile from '../screens/Profile'
import Settings from '../screens/Settings'
import Loading from './Loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { userContext } from '../App';
export const ThemeContext = createContext({
    toggleTheme: () => { },
    isThemeDark: false,
});
const AuthStack = createStackNavigator();
const FeedStack = createStackNavigator();

export default function Navigation() {
    const [isThemeDark, setIsThemeDark] = useState(false);
    const { user, setUser } = useContext(userContext)
    const lightTheme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            background:'white',
            // primary: 'rgb(255, 45, 85)',
        },
    };
    const myDarkTheme = {
        ...DarkTheme,
        colors: {
            ...DarkTheme.colors,
            // background:'red',
            // primary: 'rgb(255, 45, 85)',
        },
    };
     
    const AppTheme = isThemeDark ? myDarkTheme : lightTheme
    const toggleTheme = React.useCallback(() => {
        // AsyncStorage.setItem('dark',true)
        return setIsThemeDark(!isThemeDark);
    }, [isThemeDark]);

    const preferences = React.useMemo(
        () => ({
            toggleTheme,
            isThemeDark,
        }),
        [toggleTheme, isThemeDark]
    );


    return (
        <ThemeContext.Provider value={{isThemeDark,toggleTheme:setIsThemeDark}}>
            <NavigationContainer theme={AppTheme}>
                {(!user.isSigned) ?
                    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
                        {/* <AuthStack.Screen name="Intro" component={Intro} /> */}
                        <AuthStack.Screen name="Signin" component={Signin} initialParams={{ user, setUser }} />
                        <AuthStack.Screen name="Signup" component={Signup} initialParams={{ user, setUser }} />
                    </AuthStack.Navigator> :
                    <FeedStack.Navigator screenOptions={{ headerShown: false }}>
                        <FeedStack.Screen name="Feed" component={FeedTabs} />
                        <FeedStack.Screen name="Settings" component={Settings} />
                        <FeedStack.Screen name="Profile" component={Profile} />
                    </FeedStack.Navigator>
                }
            </NavigationContainer>
        </ThemeContext.Provider>
    )
}