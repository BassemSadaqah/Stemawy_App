import React,{useState,useContext} from 'react'
import {View,Text,StyleSheet,ToastAndroid,ScrollView} from 'react-native'
import Button from '../../components/Button'
import Header from '../../components/Header'
// import { ScrollView } from 'react-native-gesture-handler'
import RNFS from 'react-native-fs'
import {userContext} from '../../App'
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
import { gql, useMutation } from '@apollo/client'


const styles = StyleSheet.create({
    main:{
        backgroundColor:'white',
        flex:1
    }})

const ADD_QUESTION = gql`
  mutation AddQuestion($question: String!,$img:String,$choices:[String]!,$answer:Int!) {
    AddQuestion(question: $question,img:$img,choices:$choices,answer:$answer) {
      id
      success
      err_msg
    }
}`;




function Upload(props) {
    const [AddQuestion, Gql] = useMutation(ADD_QUESTION);
    const {user} = useContext(userContext)
    const [step, setStep] = useState(1)
    const [uploading, setUploading] = useState(false)
    const [question, setQuestion] = useState('')
    const [question_img,setQuestionImg]=useState('')
    const [choices,setChoices]=useState(['',''])
    const [answer, setAnswer] = useState(0)
    const drawer_navigation = props.route.params.drawer_navigation

    const submitForm=async ()=>{
        setUploading(true)
        const img_bas64 = (question_img? ('data:image/jpeg;base64,'+await RNFS.readFile(question_img.uri, 'base64')):'')
        AddQuestion({
            variables: {
                question,
                img: img_bas64,
                choices,
                answer
            }
        }).then(({data})=>{
            const {success,err_msg}=data.AddQuestion
            if(success){
                setUploading(false)
                setQuestion('')
                setAnswer(0)
                setChoices(['',''])
                setStep(1)
                setQuestionImg('')
                props.navigation.navigate('Feed')
            }else{
                ToastAndroid.show((err_msg?err_msg:'Something Went Wrong'), ToastAndroid.SHORT)
                setUploading(false)
            }
        }).catch(({message})=>{
            console.log(message)
            ToastAndroid.show('Something Went Wrong', ToastAndroid.SHORT)
            setUploading(false)
        })
    // console.log(navigation)
    //     setUploading(true)
    //     firestore().collection('Questions').add({
    //         uid: user.uid,
    //         question:question,
    //         choices:choices,
    //         answer:answer,
    //         hasImage:(question_img?true:false),
    //         isApproved:false,
    //         time: firestore.FieldValue.serverTimestamp()
    // }).then(async (data)=>{
    //     const question_id=data._documentPath._parts[1]
    //     console.log(question_id)
    //     if(question_img){
    //         const data = await RNFS.readFile(question_img.uri, 'base64')
    //         console.log(user.uid)
    //         await storage().ref(`Questions_Images/${user.uid}/${question_id}`).putString(data, 'base64')
    //     }
    //     setUploading(false)
    //     setQuestion('')
    //     setAnswer(0)
    //     setChoices(['',''])
    //     setStep(1)
    //     setQuestionImg('')
    //     props.navigation.navigate('Feed')
    // }).catch((err)=>{
    //     ToastAndroid.show('Something Went Wrong',ToastAndroid.SHORT)
    //     setUploading(false)
    // })
}
    
    return (
        <ScrollView>
        <View style={styles.main}>
        <Header drawer_navigation={drawer_navigation}/>
            {(step==1)&&<Step1 setStep={setStep} setQuestion={setQuestion} question={question} question_img={question_img} setQuestionImg={setQuestionImg}/>}
            {(step==2)&&<Step2 setStep={setStep} user={user} choices={choices} setChoices={setChoices}  question={question} question_img={question_img}/>}
            {(step==3)&&<Step3 setStep={setStep} user={user} question={question} choices={choices} setChoices={setChoices} answer={answer} setAnswer={setAnswer} question_img={question_img} uploading={uploading} submitForm={submitForm}/>}

            {/* <Button onPress={()=>submitForm(form_data,user)}>Submit</Button> */}
        </View>
        </ScrollView>

    )
}

export default Upload
