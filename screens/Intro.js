import React from 'react'
import s from './styles/Intro'
import { Text, View } from 'react-native';
import Button from '../components/Button'
// import { LinearGradient } from 'expo-linear-gradient';

function Intro({app_name,navigation}) {
    app_name= 'Stemawy';
    return (
            // < LinearGradient
            // // Background Linear Gradient
            // colors = {['#1c4606', '#88c249']}
            // style={s.Intro}>
            <View style={{backgroundColor:'orange',display:'flex',flex:1,justifyContent:'center'}}>
                <Text style={s.welcome_text}>{app_name}</Text>
                <View style={s.buttons_view}>
                    <Button onPress={()=>{navigation.navigate('Signin')}} style={s.btn} text_style={s.btn_text}>Login to continue</Button>
                    <Text style={s.or}>or</Text>
                    <Button onPress={()=>{navigation.navigate('Signup')}} style={s.btn} text_style={s.btn_text}>Sign up now</Button>
                </View>
                {/* </ LinearGradient> */}
            </View>
    )
}

export default Intro
