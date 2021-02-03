import React, { useState,useContext,createContext } from 'react'
import Feed from './Feed2'
import Upload from './Ask/Upload'
import MyProfile from './MyProfile'
import Profile from './Profile'
import Leaderboard from './Leaderboard'
import Burger from './Burger'
import {userContext} from '../App'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationContainer } from '@react-navigation/native';

export const PointsContext = createContext(0)

const Tab = createMaterialTopTabNavigator();
// const Tab = createMaterialBottomTabNavigator();
export default function FeedTabs({navigation}) {
  const {user}=useContext(userContext)
  const [points,setPoints]=useState(0)
  const providerValue = { points, setPoints }
  return (
    <PointsContext.Provider value={providerValue}>
    <Tab.Navigator
      // tabBarPosition = 'bottom'
      initialRouteName="Feed"
      // activeColor="#fff"
      // barStyle={{ backgroundColor: 'red' }} 
      tabBarOptions={{
          showIcon: true,
          showLabel:false,
          // tabStyle:{backgroundColor:'#007AFF'}
          // inactiveTintColor:'blue',
          // activeTintColor:'red'
      }}
    >
     
      <Tab.Screen
        name="Home"
        component={Feed}
        initialParams={{drawer_navigation:navigation,setPoints}}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name = "Leaderboard"
        component={Leaderboard}
        initialParams={{drawer_navigation:navigation}}
        options={{
          tabBarLabel: '',
          // tabBarLabel: 'Leaderboard',
          tabBarIcon: ({ color }) => (
            <Icon name='trophy' size={24} color={color}/>
          ),
        }}
      />
      <Tab.Screen
        name="Upload"
        component={Upload}
        initialParams={{drawer_navigation:navigation}}
        options={{
          tabBarLabel: 'Upload',
          tabBarIcon: ({ color }) => (
            // <Icon name='upload' size={24} color={color}/>
            <MaterialCommunityIcons name="cloud-upload" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="MyProfile"
        // component={MyProfile}
        component={Profile}
        initialParams={{id:user.id,showHeader:false}}
        options={{
          tabBarLabel: 'Profile',
          tabBarBadge:3,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
       <Tab.Screen
        name="Menu"
        component={Burger}
        initialParams={{drawer_navigation:navigation}}
        options={{
          tabBarLabel: 'Menu',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="menu" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  </PointsContext.Provider> 
  );
}