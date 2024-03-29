/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
console.warn=()=>{}
import React,{useState,useEffect,createContext} from 'react';
import {SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar,ToastAndroid} from 'react-native';
import Splash from './screens/Splash';
import Intro from './screens/Intro';
import Signin from './screens/Signin'
import Signup from './screens/Signup'
import FeedTabs from './screens/FeedTabs'
import Profile from './screens/Profile'
import Settings from './screens/Settings'
import Loading from './components/Loading';
import Navigation from './components/Navigation'
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import axios from 'axios';
import { onError } from "@apollo/client/link/error";


// import { acc } from 'react-native-reanimated';



export const userContext = createContext({ name: 'Bassem Sadaqah' })

const defaultClientOptions = {
  query: {
    fetchPolicy: 'cache-and-network',
  }
}

function App() {
  // return <Splash/>
  const [isLoading, setisLoading] = useState(true)
  const [Err, setErr] = useState(false)
  const [user, setUser] = useState({ isSigned: null }) //set id:null to be signed out

  
  const httpLink = createHttpLink({
      uri: 'https://stemawy-app.herokuapp.com/graphql',
  });
  const authLink = setContext(async(_, { headers }) => {
    const token = await AsyncStorage.getItem('accessToken');
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? token : "",
      }
    }
  });
  const errLink = onError(({ graphQLErrors, networkError,operation }) => {
    if (graphQLErrors)
      graphQLErrors.map(({ message, locations, path,name }) =>{
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        )
        if(message.code==400 || message=='Not Authorized'){
          AsyncStorage.removeItem('accessToken').then(()=>{
          setUser({isSigned:false})
        })}
    });

    if (networkError) console.log(`[Network error]: ${networkError}`);
  });

  const client = new ApolloClient({
    link: errLink.concat(authLink.concat(httpLink)),
    cache: new InMemoryCache(),
    defaultOptions: defaultClientOptions
  });

  const Logout=({route})=>{
    const {setUser}=route.params
        AsyncStorage.removeItem('accessToken')
        setUser({isSigned:false})
        client.clearStore()
      // Sign-out successful.
    return(<></>)
  }


  useEffect(() => {
    async function getUser(){
      try{
        const accessToken= await AsyncStorage.getItem('accessToken')  
        // console.log(accessToken)
        if(accessToken){
            try{
              const {data}=await axios.get('https://stemawy-app.herokuapp.com/user',{headers:{authorization:accessToken}})
              if(data.success){
                setUser({isSigned:true,...data.user})
              }else{
                setUser({isSigned:false})
              }
              // console.log(data)
            }catch{
              setErr(true)
              setUser({isSigned:false})
            }
        }else{
          setUser({isSigned:false})
        }
    }
    catch{
      setUser({isSigned:false})
    }}
    getUser()
  },[])
    

  if (user.isSigned==null) {
    return <Splash />
  }
  return (
  <ApolloProvider client={client}>
    <userContext.Provider value={{user,setUser}}>
      {/* <StatusBar style="dark" hidden={true} /> */}
      <Navigation/>
    </userContext.Provider>
  </ApolloProvider>

  );
}

export default App;