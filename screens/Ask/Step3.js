import React,{useState,useEffect} from 'react'
import { StyleSheet,TextInput, View,Text,Image,FlatList, TouchableOpacity } from 'react-native';
import Input from '../../components/Input'
import Button from '../../components/Button'

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
        // height: 40,
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
    clicked: {
        backgroundColor: '#39e739'
    },
    btns:{
        flexDirection:'row',
        display:'flex',
        justifyContent:'space-between',
        width:'100%',
        paddingHorizontal:10,
        marginTop:15,
        
    },
    back:{
        backgroundColor: '#f7f7fa',
    },
    back_txt:{
        color:'#575757',
    },
    disabled: {
        backgroundColor: '#3498ffa0'
    }
});
function Step3(props) {
    const {user,setStep,question,choices,setChoices,submitForm,answer,setAnswer,question_img,uploading}=props
    useEffect(() => {
        setChoices(c=>c.filter(v=>v!=''))
    }, [])
    const Answer_button = (props)=>{
        return (
            <TouchableOpacity  onPress={()=>{setAnswer(props.index)}} style={answer==props.index?({...styles.btn,...styles.clicked}):styles.btn}>
                <Text style={(answer==props.index)?{color:'white',fontSize:17,fontWeight:'700'}:{color:'black',fontSize:16}}>{props.ans}</Text>
            </TouchableOpacity>
        )
    }
    return (
       <View style={styles.Question}>
            <View style={styles.profile_view}>
                <Image style={styles.profile_img} source={{uri:'https://images-na.ssl-images-amazon.com/images/I/81YDuTWSHyL.png'}}/>
                <View>
                    <Text style={styles.username}>{user.first_name} {user.last_name}</Text>
                    <Text style={styles.since}>Just Now</Text>
                </View>
            </View>
            <Text style={styles.question_text}>{question}</Text>
            {question_img? <Image style={styles.question_img} source={{uri:question_img.uri}}/>:null}
            <FlatList
                style={{width:'100%'}}
                data={choices}
                renderItem={(e)=><Answer_button ans={e.item} index={e.index+1}/>}
                keyExtractor={item => item.id}
            />
            <Answer_button ans="I don't know the answer" index={0}/>
            <View style={styles.btns}>
                <Button text_style={styles.back_txt} onPress={()=>setStep(s=>s-1)}  style={styles.back}>Back</Button>
                <Button disabled={uploading} onPress={submitForm} style={uploading?{...styles.next,...styles.disabled}:styles.next}>Submit</Button>
            </View>
        </View >
    )
}

export default Step3
