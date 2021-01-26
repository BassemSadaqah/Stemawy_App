import React, { useState } from 'react'
import Feed from './Feed'
import Upload from './Ask/Upload'
import Profile from './Profile'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationContainer } from '@react-navigation/native';

const Tab = createMaterialBottomTabNavigator();

export default function FeedTabs({navigation}) {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      activeColor="#fff"
      barStyleeee={{ backgroundColor: 'red' }} 
    >
      <Tab.Screen
        name="Feed"
        component={Feed}
        initialParams={{drawer_navigation:navigation}}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={Upload}
        initialParams={{drawer_navigation:navigation}}
        options={{
          tabBarLabel: 'Upload',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="cloud-upload" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        initialParams={{drawer_navigation:navigation}}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}