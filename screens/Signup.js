import React,{useState} from 'react'
import { StyleSheet,Text, View,TextInput,ScrollView,ToastAndroid,Keyboard,TouchableWithoutFeedback,FlatList, TouchableOpacity } from 'react-native';
// import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import Button from '../components/Button'
import Input from '../components/Input'
import AsyncStorage from '@react-native-async-storage/async-storage'
import styles from './styles/Signup'
import axios from 'axios'

const submitForm=(setUser,form_data)=>{
    const {first_name,last_name,email,password,confirm_password}=form_data
    if(password!=confirm_password) return ToastAndroid.show('Passwords didn\'t match', ToastAndroid.SHORT);
    if(!(first_name&&last_name&&email&&password&&confirm_password)) return ToastAndroid.show('Please Enter Valid Data', ToastAndroid.SHORT);
    axios.post('http://192.168.1.7:5000/register',form_data)
    .then(({data})=>{
        if(data.success && data.accessToken){
            AsyncStorage.setItem('accessToken', data.accessToken).then(()=>{
                setUser({isSigned:true,...data.user})
            })
        }else{
            ToastAndroid.show(data.err_msg,ToastAndroid.SHORT)
        }
    })
    .catch(err=>ToastAndroid.show('Something Went Wrong',ToastAndroid.SHORT))
    // firebase.auth().createUserWithEmailAndPassword(email, password)
    // .then(({user}) => {
    //     console.log(user)
    //     setUser({isSigned:true,...user._user,displayName:name})
    //      return user.updateProfile({
    //         displayName: name,
    //     })
    // })
    // .catch((error) => {
    //     if (error.code === 'auth/email-already-in-use') {
    //         ToastAndroid.show('That email address is already in use!', ToastAndroid.SHORT);
    //     }
    //     else if (error.code === 'auth/invalid-email') {
    //         ToastAndroid.show('That email address is invalid!', ToastAndroid.SHORT);
    //     }else{
    //         ToastAndroid.show(error.message, ToastAndroid.SHORT);
    //     }
    // });

}
function Signin({navigation,route}) {
    const {user,setUser}=route.params
    const [form_data, setFormData] = useState({ err: false, err_msg: '',first_name:'',last_name:'', email: '', password: '',confirm_password:'' })
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.main} >
                <Input style={styles.input} onChange={(txt)=>{setFormData(s=>({...s,first_name:txt}))}} placeholder='First Name' defaultValue={form_data.first_name} />     
                <Input style={styles.input} onChange={(txt)=>{setFormData(s=>({...s,last_name:txt}))}} placeholder='Last Name' defaultValue={form_data.last_name} />     
                <Input style={styles.input} onChange={(txt)=>{setFormData(s=>({...s,email:txt}))}} placeholder='Email' defaultValue={form_data.email} keyboardType='email-address'/>     
                <Input style={styles.input} onChange={(txt)=>{setFormData(s=>({...s,password:txt}))}} placeholder='Password' secureTextEntry/>     
                <Input style={styles.input} onChange={(txt)=>{setFormData(s=>({...s,confirm_password:txt}))}} placeholder='Confirm Password' secureTextEntry/>     
                <Button onPress={()=>{submitForm(setUser,form_data)}} style={styles.btn}>Register</Button>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default Signin
