import React,{useState} from 'react'
import { StyleSheet,TextInput, View,TouchableOpacity,Image,Text,ScrollView} from 'react-native';
import Input from '../../components/Input'
import Button from '../../components/Button'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DocumentPicker from 'react-native-document-picker';
// import { ScrollView } from 'react-native-gesture-handler';
import {useTheme} from '@react-navigation/native'

async function pickFile(setQuestionImg) {
    try {
        const res = await DocumentPicker.pick({
            type: [DocumentPicker.types.images],
        });
        setQuestionImg(res)
        
        
    } catch (err) {
        if (DocumentPicker.isCancel(err)) {
            // User cancelled the picker, exit any dialogs or menus and move on
        } else {
            throw err;
        }
    }
}
function Step1(props) {
    const {colors,dark}=useTheme()
    const styles = StyleSheet.create({
        step_1: {
            display: 'flex',
            justifyContent: 'center',
            marginTop: 10,
            // borderWidth:1,
            // borderColor:'#f7f7fa'
        },
        question: {
            display: 'flex',
            height: 120,
            textAlignVertical: 'top'
        },

        next: {
            flex: 1,
            alignSelf: 'flex-end',
        },
        disabled: {
            backgroundColor: '#3498ffa0'
        },
        upload_btn: {
            alignSelf: 'flex-start',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            // backgroundColor: 'rgb(3,3,3)',
            backgroundColor: 'rgba(0,0,0,0)',
            paddingBottom: 0,
            marginBottom: 0,
            // position:'relative',
        },
        close_icon: {
            position: 'absolute',
            right: 5,
            top: 5,
            zIndex: 10,
            backgroundColor: 'gray',
            borderRadius: 100,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 3,
            },
            shadowOpacity: 0.29,
            shadowRadius: 4.65,
            elevation: 10,

        },
        img_prev: {
            // display:'flex',
            // flexDirection:'col',
        },
        question_img: {
            width: '100%',
            aspectRatio: 1,
        },
        question_input_view: {
            // display:'flex',
            // justifyContent:'space-between',
            minHeight: 150,
            maxHeight: 350,
            borderColor: 'rgba(34,36,38,.15)',
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5,
            borderWidth: 1,
            borderBottomWidth: 0,
            margin: 5,
            marginBottom: 0,
            paddingHorizontal: 10,
            overflow: 'scroll'
        },
        upload_btn_view: {
            margin: 5,
            marginTop: 0,
            borderColor: 'rgba(34,36,38,.15)',
            borderBottomLeftRadius: 5,
            borderBottomRightRadius: 5,
            borderWidth: 1,
            borderTopWidth: 0,
            padding: 10

        },
        question_input: {
            fontSize: 15,
            color:colors.text,
            // borderWidth:1,
            // height:'100%',
        }
    })
    const {question_img,setQuestionImg}=props
    var disabled=props.question.length<2
    // var disabled=props.question.length<2 && !question_img
    return (
        <View style={styles.step_1}>
                <ScrollView style={styles.question_input_view}>
                <TextInput placeholderTextColor={dark?colors.text:'gray'} onChangeText={(txt)=>{props.setQuestion(txt)}} value={props.question} style={styles.question_input} placeholder='Enter your Question' multiline={true}/>
                    {question_img?
                    <View style={styles.img_prev}>
                        <TouchableOpacity onPress={()=>setQuestionImg('')} style={styles.close_icon}>
                            <MaterialCommunityIcons  name="close" color='white' size={29} /> 
                        </TouchableOpacity>
                        <Image style={styles.question_img} source={{uri:question_img.uri}}/>
                    </View>
                    :null}
                </ScrollView>
                {!question_img?<View style={styles.upload_btn_view}>
                <TouchableOpacity onPress={()=>pickFile(setQuestionImg)} style={styles.upload_btn}>
                        <MaterialCommunityIcons style={styles.icon} name="image" color={colors.text} size={24} />
                        <Text style={{color:colors.text}}>Attach Image</Text>
                </TouchableOpacity>
                </View>:null}
                <Button disabled={disabled} onPress={()=>props.setStep(step=>step+1)} style={disabled?{...styles.next,...styles.disabled}:styles.next}>Next</Button>
        </View>
    )
}

export default Step1
