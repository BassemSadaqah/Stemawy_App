import React from 'react'
import { StyleSheet,TextInput, View,Text,Image,FlatList, TouchableOpacity } from 'react-native';
import Input from '../../components/Input'
import Button from '../../components/Button'
import Choice from './Choice'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const styles = StyleSheet.create({

    Question: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        borderWidth: 1,
        borderColor: 'grey',
    },
    btn: {
        borderRadius: 20,
        width: '95%',
        height: 40,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'grey',
        margin: 5,
        display: 'flex',
        justifyContent: 'center',
        padding: 10,

    },
    question_text: {
        alignSelf: 'flex-start',
        fontSize: 17,
        marginTop: 10,
        marginBottom: 15,
        marginLeft: 10,
    },
    question_img: {
        width: '100%',
        // height:200,
        marginBottom:10,
        aspectRatio: 1.5
        // resizeMode:'repeat'
    },
    profile_view:{
        padding:10,
        width:'100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    profile_img: {
        width: '12%',
        borderRadius: 10000,
        aspectRatio: 1,
        marginRight:10,
    },
    username:{
        color: '#385898',
        fontWeight:'700',
    },
    since:{
        color: '#616770'
    },
    choices_container:{
        display:'flex',
        alignItems:'center'
    },  
    btns:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:10,
        marginTop:10
    },
    back:{
        // backgroundColor: '#f0f0f0',
        backgroundColor: '#f7f7fa',
    },
    back_txt:{
        color:'#575757',
    },
    add_choice:{
        borderRadius: 20,
        width: '95%',
        height: 40,
        backgroundColor: '#f0f0f0'
    },
    disabled:{
        backgroundColor: '#3498ffa0'
    }
});
function addChoice(choices, setChoices) {
    var choices = choices.slice()
    choices.push('')
    setChoices(choices)
}
function Step2(props) {
    const {user,setChoices,choices,setStep,question,question_img}=props
    const disabled=choices[0].length<1 || choices[1].length<1
    console.log(disabled)
    return (
    <View style={styles.step_2}>
            <View style={styles.profile_view}>
                <Image style={styles.profile_img} source={{uri:'https://images-na.ssl-images-amazon.com/images/I/81YDuTWSHyL.png'}}/>
                <View>
                    <Text style={styles.username}>{user.first_name} {user.last_name}</Text>
                    <Text style={styles.since}>Just Now</Text>
                </View>
            </View>
            <Text style={styles.question_text}>{question}</Text>
            {question_img? <Image style={styles.question_img} source={{uri:question_img.uri}}/>:<></>}

            <View style={styles.choices_container}>
                <FlatList data={choices} renderItem={({index})=><Choice setChoices={setChoices} choices={choices} index={index} key={index*55}/>} />
            </View>
            {choices.length<4 && <Button onPress={()=>addChoice(choices,setChoices)} text_style={{color:'#575757'}} style={styles.add_choice}>Add Choice</Button>}
            <View style={styles.btns}>
                <Button text_style={styles.back_txt} onPress={()=>setStep(s=>s-1)}  style={styles.back}>Back</Button>
                <Button disabled={disabled} onPress={()=>setStep(s=>s+1)} style={disabled?{...styles.next,...styles.disabled}:styles.next}>Next</Button>
            </View>
    </View>
    )
}

export default Step2
