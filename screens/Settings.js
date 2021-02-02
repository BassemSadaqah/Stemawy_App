import React,{useState,useContext,useEffect} from 'react';
import {View,Text,StyleSheet,Keyboard, TouchableWithoutFeedback, ToastAndroid} from 'react-native'
import Input from '../components/Input'
import Button from '../components/Button'
import Loading from '../components/Loading'
import StackHeader from '../components/StackHeader'
import {userContext} from '../App'
import { gql, useQuery,useMutation } from '@apollo/client'
import {useTheme} from '@react-navigation/native'

const USER_DATA = gql `
query user_data{
    user{
        first_name
        last_name
        profile_pic
        email
    }
}`

const UPDATE_USER_DATA = gql`
  mutation editUser($first_name: String!,$last_name:String!,$email:String!,$bio:String!) {
    editUser(first_name: $first_name, last_name: $last_name, email: $email, bio: $bio) {
      id
      success
      err_msg
    }
}`;


function Settings({navigation}) {
    const {user,setUser} = useContext(userContext)
    const {colors,dark}=useTheme()
    const { loading, error, data,refetch } = useQuery(USER_DATA,{fetchPolicy:'no-cache'});

    const styles = StyleSheet.create({
        main: {
            flex: 1,
            paddingTop: 10
        },
        input_container: {
            margin: 5,
        },
        input: {
            backgroundColor:colors.card,
            color:colors.text,
        },
        txt: {
            color:colors.text,
            paddingLeft: 8,
            paddingBottom: 3,
            fontWeight: '700'
        }
    })
    function InputView(props) {
        return (
            <View style={styles.input_container}>
                <Text style={styles.txt}>{props.title}</Text>
                <Input style={styles.input} placeholder={props.title} placeholderTextColor={dark?'#a1a1a1':'gray'} value={props.value} onChangeText={props.onChangeText} />
            </View>)
    }
    const submitForm=()=>{
        setSaving(true)
        editUser({variables:formData}).then(({data})=>{
            console.log(data)
            if(!data.editUser.success && data.editUser.err_msg){
                ToastAndroid.show(data.editUser.err_msg, ToastAndroid.SHORT)
                setSaving(false)
            }else if(data.editUser.success){
                setUser(u=>({...u,...formData}))
                navigation.navigate('Home')
            }
            console.log(data)
        }).catch(err=>{
            console.log(err)
            setSaving(false)
            ToastAndroid.show('Something Went Wrong',ToastAndroid.SHORT)
        })
    }
    useEffect(()=>{
        if(!loading){
            setFormData(s=>({...s,...data.user}))
        }
    },[loading])
    const [formData,setFormData]=useState({first_name:'',last_name:'',email:'',bio:''})
    const [saving,setSaving]=useState(false)
    const [editUser, {data:result}] = useMutation(UPDATE_USER_DATA);
    if(loading) return <><StackHeader navigation={navigation} title='Settings'/><Loading/></>
    if(error) return <><StackHeader navigation={navigation} title='Settings'/></>
    // console.log(data)
    return (    
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{flex:1}}>
            <StackHeader navigation={navigation} title='Settings'/>
            <View style={styles.main} >
                <InputView title='First Name' onChangeText={(txt)=>setFormData(s=>({...s,first_name:txt}))} value={formData.first_name}/>
                <InputView title='Last Name' onChangeText={(txt)=>setFormData(s=>({...s,last_name:txt}))} value={formData.last_name}/>
                <InputView title='Email' onChangeText={(txt)=>setFormData(s=>({...s,email:txt}))} value={formData.email}/>
                <InputView title='Bio' onChangeText={(txt)=>setFormData(s=>({...s,bio:txt}))}  value={formData.bio}/>
                <Button disabled={saving}  onPress={()=>submitForm()} style={{backgroundColor:saving?'#00C85333':'#00C853'}}>Save</Button>
            </View>
        </View>
        </TouchableWithoutFeedback>
    )
}

export default Settings
