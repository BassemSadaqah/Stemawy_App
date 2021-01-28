import React,{useState,useContext,useEffect} from 'react';
import { StyleSheet, Text, View,Image, Modal,ToastAndroid ,FlatList, TouchableOpacity,Dimensions,PureComponent} from 'react-native';
// import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import s from './styles/Question'
import Button from './Button'
import Loading from '../components/Loading'
import {userContext} from '../App'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { gql, useQuery } from '@apollo/client'
import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid';
import ImageViewer from 'react-native-image-zoom-viewer';



export default React.memo(function Question(props) {
    console.log('qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqstione '+props.id)
    const GET_QUESTION = gql `
    query question($id:Int!){
        question(id:$id){
            id
            question
            img
            choices
            answer
            time
            user{
                id
                first_name
                last_name
                profile_pic
            }
        }
    }`
    function since_when(previous) {
        var current = Date.parse(new Date().toUTCString()) - 7200000;
        var msPerMinute = 60 * 1000;
        var msPerHour = msPerMinute * 60;
        var msPerDay = msPerHour * 24;
        var msPerMonth = msPerDay * 30;
        var msPerYear = msPerDay * 365;
    
        var elapsed = current - previous;
    
        if (elapsed < msPerMinute) {
            return Math.round(elapsed / 1000) + ' seconds ago';
        } else if (elapsed < msPerHour) {
            return Math.round(elapsed / msPerMinute) + ' minutes ago';
        } else if (elapsed < msPerDay) {
            return Math.round(elapsed / msPerHour) + ' hours ago';
        } else if (elapsed < msPerMonth) {
            return Math.round(elapsed / msPerDay) + ' days ago';
        } else if (elapsed < msPerYear) {
            return Math.round(elapsed / msPerMonth) + ' months ago';
        } else {
            return Math.round(elapsed / msPerYear) + ' years ago';
        }
    }
    
    const { loading, error, data } = useQuery(GET_QUESTION,{variables:{id:props.id}});
    const {user,setUser}=useContext(userContext)
    const [clicked, setClicked] = useState(null)
    const [answered, setAnswered] = useState(false)
    const [modalVisibility, setModalVisibility] = useState(false)
    const [aspectRatio, setAspectRatio] = useState(1000)
    
    useEffect(() => {
        console.log('qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqstion ' + props.id)
        if (!loading) {
            if(data.question.img){
            Image.getSize(gql_question.img, (srcWidth, srcHeight) => {
                setAspectRatio(srcWidth / srcHeight)
            }, (err) => {
                // setAspectRatio(1)
            })
        }}
    })
     props = {
        name: user.displayName,
        first_name: 'Fady',
        last_name: 'sadaqah',
        question: (props.question ? props.question : 'How many lobes are ther in the brain'),
        // question_img: props.question_img,
        question_img: ('https://cdn.dribbble.com/users/1672258/screenshots/14942765/media/522e374719661a6a695303b4aeccfa87.png?compress=1&resize=800x600'),
        profile_pic: user.photoURL ? user.photoURL : 'https://images-na.ssl-images-amazon.com/images/I/81YDuTWSHyL.png',
        choices: (props.choices?props.choices:['One', 'Two', 'Three', 'Four', 'Five', 'Six']),
        answer:props.answer?props.answer:0,
        question_id:props.question_id
        ,...props
    }
   

    if (error) {
        console.log(error.message)
        return <></>
    }
    const submitAnswer=()=>{
        // console.log(clicked)
        // // console.log(props.answer)
        // firestore().collection('Answers').doc((user.uid+'_'+props.question_id)).set({
        //     uid: user.uid,
        //     questionId:props.question_id,
        //     answer:clicked+1,
        //     correct:clicked+1==props.answer,     
        //     points:(clicked+1==props.answer?10:0),       
        //     time: firestore.FieldValue.serverTimestamp()
        // })
        // .then(async (data)=>{
        //     console.log(data)
        // })
        // if (clicked+1==props.answer) {
        //     ToastAndroid.show('Coreeeeeeeeeeeeect',ToastAndroid.SHORT)
        // }
        setAnswered(true)
    }
    const Answer_button = (props)=>{
        const btn_style=()=>{
            if(answered){
                console.log(clicked)
                console.log(props.answer)
                if (props.index ==clicked && clicked+1==gql_question.answer) {
                    return {...s.btn,backgroundColor: '#22d652'}
                }
                else if(props.index ==clicked && clicked+1!=gql_question.answer) {
                    return {...s.btn,backgroundColor: '#f72f2f'}
                }
                 else {
                    return {...s.btn}
                }
            }
            else if(clicked==props.index){
                return {...s.btn,...s.clicked}
            }else{
                return s.btn
            }
        }
        return (
            <TouchableOpacity disabled={answered}  onPress={()=>{setClicked(props.index)}} style={btn_style()}>
                <Text>{props.ans}</Text>
            </TouchableOpacity>
        )
    }
    if(loading) return <></>
    // if(loading) return <Loading/>
    let gql_question=data.question
     
    return (
        <View style={s.Question}>
                <View style={s.profile_view}>
                    <Image style={s.profile_img}  source={{uri:(gql_question.user.profile_pic?gql_question.user.profile_pic:'https://i.stack.imgur.com/l60Hf.png')}}/>
                    <View>
                        <Text style={s.username}>{gql_question.user.first_name} {gql_question.user.last_name}</Text>
                        <Text style={s.since}>{since_when(gql_question.time)}</Text>
                    </View>
                </View>
                <Text style={s.question_text}>{gql_question.question}</Text>
                 {gql_question.img?
                 <View>
                     <TouchableOpacity onPress={()=>{setModalVisibility(true)}}>
                        <Image style={{...s.question_img,aspectRatio}}  source={{uri:gql_question.img}}/>
                     </TouchableOpacity>
                    <Modal  animationType='none' onRequestClose={()=>setModalVisibility(false)} visible={modalVisibility}  transparent={true}>
                        <ImageViewer onSave={()=>console.log('aaa')} renderHeader={()=>(<View></View>)} enableSwipeDown={true}  onSwipeDown={()=>setModalVisibility(false)} renderIndicator={()=>null} imageUrls={[{url:gql_question.img}]} />
                    </Modal>
                 </View>
                 :null}
                {/* {gql_question.img?<Image style={s.question_img} source={{uri:gql_question.img}}/>:null} */}
                <FlatList
                    style={{width:'100%'}}
                    data={gql_question.choices}
                    renderItem={(e)=><Answer_button ans={e.item} answer={props.answer} index={e.index}/>}
                    keyExtractor={()=>uuid()}
                />
                {!answered && clicked!==null?<Button onPress={submitAnswer}>Submit</Button>:null}

        </View >
    );
})

