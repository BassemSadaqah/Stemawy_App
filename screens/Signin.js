import React,{useState,useContext} from 'react'
import { StyleSheet,Text, View,TextInput,ScrollView,ToastAndroid,Keyboard,TouchableWithoutFeedback,FlatList, TouchableOpacity } from 'react-native';
// import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Button from '../components/Button'
import Input from '../components/Input'
import {userContext} from '../App'
import styles from './styles/Signin'
import axios from 'axios'
import { LoginManager, AccessToken } from 'react-native-fbsdk';

const submitForm=(form_data,setUser)=>{
    // setUser({id:1,email:'ee'})
    const {email,password}=form_data
    if(!email || !password) return ToastAndroid.show('Please Enter Valid Data', ToastAndroid.SHORT);
     axios.post('https://stemawy-app.herokuapp.com/login',form_data)
    .then(({data})=>{
        if(data.success && data.accessToken &&data.user){
            console.log(data)
            AsyncStorage.setItem('accessToken', data.accessToken).then(() => {
                setUser({isSigned:true,...data.user})
            })
        }else{
            ToastAndroid.show(data.err_msg,ToastAndroid.SHORT)
        }
    }).catch(err=>{
        console.log(err)
        ToastAndroid.show('Something Went Wrong', ToastAndroid.SHORT)
    })

}
const fbSignin=async (setUser)=>{
    // Attempt login with permissions
  const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
  if (result.isCancelled) {
    throw 'User cancelled the login process';
  }
  // Once signed in, get the users AccesToken
  const data = await AccessToken.getCurrentAccessToken();
//   console.log(data)
  if (!data) {
    throw 'Something went wrong obtaining access token';
  }
  // Create a Firebase credential with the AccessToken
  console.log(data.accessToken)
   axios.post('https://stemawy-app.herokuapp.com/fb-login',{access_token:data.accessToken})
    .then(({data})=>{
        console.log(data)
        if(data.success && data.accessToken &&data.user){
            console.log(data)
            AsyncStorage.setItem('accessToken', data.accessToken).then(() => {
                setUser({isSigned:true,...data.user})
            })
        }else{
            ToastAndroid.show(data.err_msg,ToastAndroid.SHORT)
        }
    }).catch(err=>{
        console.log(err)
        ToastAndroid.show('Something Went Wrong', ToastAndroid.SHORT)
    })
//   const facebookCredential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
  // AsyncStorage.setItem('fb_user',JSON.stringify({email:facebookCredential.email,}))
//   console.log(facebookCredential)
  // Sign-in the user with the credential
//   firebase.auth().signInWithCredential(facebookCredential).then(data=>{
//     const user=data.user._user

//     if(data.additionalUserInfo.isNewUser){
//      firestore().collection('Users').doc(user.uid).set({
//             uid: user.uid,
//             name:user.displayName,
//             email:user.email,
//             points:0,
//             provider:'facebook.com',
//             time: firestore.FieldValue.serverTimestamp()
//           })
//           .then(data=>{setUser({isSigned:true,...user})
//         })

//     }else{
//       setUser({isSigned:true,...user})
//     }
//   }).catch(err=>{
//       ToastAndroid.show(err.message, ToastAndroid.SHORT);
//   })


}
function Signin() {
    const {user,setUser}=useContext(userContext)
    console.log(user)
    const [form_data, setFormData] = useState({ err: false, err_msg: '', email: '', password: '' })
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.main} >
                <Input onChange={(txt)=>{setFormData(s=>({...s,email:txt}))}} placeholder='Email' defaultValue={form_data.email} keyboardType='email-address'/>     
                <Input onChange={(txt)=>{setFormData(s=>({...s,password:txt}))}} placeholder='Password' secureTextEntry/>     
                <Button onPress={()=>{submitForm(form_data,setUser)}} style={styles.btn}>Sign In</Button>
                <Button onPress={()=>{fbSignin(setUser)}} style={styles.btn_social}>Sign In With Facebook</Button>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default Signin
