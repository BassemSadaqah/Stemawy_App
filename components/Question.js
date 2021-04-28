import React,{useState,useContext,useEffect} from 'react';
import { StyleSheet, Text, View,Image, Modal,ToastAndroid ,FlatList, TouchableOpacity} from 'react-native';
// import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
// import s from './styles/Question'
import Button from './Button'
import {userContext} from '../App'
import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid';
import ImageViewer from 'react-native-image-zoom-viewer';
import {useTheme} from '@react-navigation/native'
import { PointsContext } from '../screens/FeedTabs'

function since_when(previous) {
    var current = Date.parse(new Date().toUTCString()); //-7200000
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
export default React.memo(function Question(props) {
    const {user}=useContext(userContext)
    const [clicked, setClicked] = useState(null)
    const [answered, setAnswered] = useState(false)
    const [modalVisibility, setModalVisibility] = useState(false)
    const [aspectRatio, setAspectRatio] = useState(1000)
    const {colors}=useTheme()
    // const {setPoints} = useContext(PointsContext)
    console.log('Question')
    const s = StyleSheet.create({
        Question: {
            display: 'flex',
            backgroundColor: colors.background,
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            borderBottomWidth: 1.5,
            borderColor: 'grey',
        },
        btn: {
            borderRadius: 20,
            width: '95%',
            height: 40,
            backgroundColor: colors.card,
            borderWidth: 1,
            borderColor: 'grey',
            margin: 5,
            display: 'flex',
            justifyContent: 'center',
            padding: 10,

        },
        btn_txt:{
            color: colors.text,
        },
        question_text: {
            alignSelf: 'flex-start',
            fontSize: 17,
            marginTop: 10,
            marginBottom: 15,
            marginHorizontal: 10,
            color:colors.text,
        },
        question_img: {
            width: '100%',
            // minHeight:100,
            // height:200,
            marginBottom: 10,
            // flex:1,
            aspectRatio: 3 / 2,
            // aspectRatio: 1
            // resizeMode:'repeat'
        },
        profile_view: {
            padding: 10,
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start'
        },
        profile_img: {
            width: 45,
            borderRadius: 10000,
            aspectRatio: 1,
            marginRight: 10,
        },
        username: {
            color: '#385898',
            fontWeight: '700',
        },
        since: {
            color: '#616770'
        },
        clicked: {
            backgroundColor: '#a3a0a0'
        }
    });
    //  props = {
    //     name: user.displayName,
    //     first_name: 'Fady',
    //     last_name: 'sadaqah',
    //     user_img: '',
    //     question: (props.question ? props.question : 'How many lobes are ther in the brain'),
    //     question_img: props.question_img,
    //     // question_img: ('https://cdn.dribbble.com/users/1672258/screenshots/14942765/media/522e374719661a6a695303b4aeccfa87.png?compress=1&resize=800x600'),
    //     user_img: user.photoURL ? user.photoURL:'https://images-na.ssl-images-amazon.com/images/I/81YDuTWSHyL.png',
    //     choices: (props.choices?props.choices:['One', 'Two', 'Three', 'Four', 'Five', 'Six']),
    //     answer:props.answer?props.answer:0,
    //     question_id:props.question_id,
    //     ...props
    // }
    useEffect(() => {
        let mounted=true
        if(props.img){
            Image.getSize(props.img, (srcWidth, srcHeight) => {
                if(mounted){
                    setAspectRatio(srcWidth / srcHeight)
                }
            }, (err) => {
                // setAspectRatio(1)
            })
        }
        return function cleanup() {
            console.log('Unmountttttttttttttng')
            mounted = false
        }

    })
    const submitAnswer=()=>{
        if(clicked+1==props.answer){
            props.setPoints(p => p + 5)
        }
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
    const Answer_button = (Props)=>{
        const btn_style=()=>{
            if(answered){
                if (Props.index ==clicked && clicked+1==Props.answer) {
                    return {...s.btn,backgroundColor: '#22d652'}
                }
                else if(Props.index ==clicked && clicked+1!=Props.answer) {
                    return {...s.btn,backgroundColor: '#f72f2f'}
                }
                 else {
                    return {...s.btn}
                }
            }
            else if(clicked==Props.index){
                return {...s.btn,...s.clicked}
            }else{
                return s.btn
            }
        }
        return (
            <TouchableOpacity disabled={answered}  onPress={()=>{setClicked(Props.index)}} style={btn_style()}>
                <Text style={s.btn_txt}>{Props.ans}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={s.Question}>
                <TouchableOpacity onPress={()=>props.navigation.navigate('Profile',{id:props.id})} disabled={!props.isFeed} style={s.profile_view}>
                    <Image style={s.profile_img} source={{uri:(props.profile_pic?props.profile_pic:'https://i.stack.imgur.com/l60Hf.png')}}/>
                    <View>
                        <Text style={s.username}>{props.first_name} {props.last_name}</Text>
                        <Text style={s.since}>{since_when(props.time)}</Text>
                    </View>
                </TouchableOpacity>
                <Text style={s.question_text}>{props.question}</Text>
                {props.img?
                 <View>
                     <TouchableOpacity onPress={()=>{setModalVisibility(true)}}>
                        <Image style={{...s.question_img,aspectRatio}}  source={{uri:props.img}}/>
                     </TouchableOpacity>
                    <Modal  animationType='none' onRequestClose={()=>setModalVisibility(false)} visible={modalVisibility}  transparent={true}>
                        <ImageViewer renderHeader={()=>(<View></View>)} enableSwipeDown={true}  onSwipeDown={()=>setModalVisibility(false)} renderIndicator={()=>null} imageUrls={[{url:props.img}]} />
                    </Modal>
                 </View>
                 :null}
                {/* {props.img?<Image style={s.question_img} source={{uri:props.img}}/>:null} */}
                    <FlatList
                        style={{width:'100%'}}
                        data={props.choices}
                        renderItem={(e)=><Answer_button ans={e.item} answer={props.answer} index={e.index}/>}
                        listKey={uuid()}
                        keyExtractor={(item, index) => index.toString()}
                        // keyExtractor={()=>uuid()}
                    />
                {!answered && clicked!==null?<Button onPress={submitAnswer}>Submit</Button>:null}

        </View >
    );
})


