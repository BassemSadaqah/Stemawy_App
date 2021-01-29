import React,{useState,useEffect,useContext} from 'react'
import { StyleSheet,TextInput, View,Text,Image,FlatList, TouchableOpacity,ScrollView,RefreshControl } from 'react-native';
import Header from '../components/Header'
import Hr from '../components/Hr'
import Question from '../components/Question'
import Loading from '../components/Loading'
import Input from '../components/Input'
import Button from '../components/Button'
import Err from '../components/Err'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {userContext} from '../App'
import { gql, useQuery } from '@apollo/client'
import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid';


const styles=StyleSheet.create({
    container:{
        display:'flex',
        alignItems:'center',
        backgroundColor:'white',
        flex:1
    },
    profile_img:{
        aspectRatio:1,
        borderRadius:200,
        width:'50%',
        marginTop:35,
    },
    profile_name:{
        fontSize:30,
        fontWeight:'700',
        marginTop:25,
        paddingHorizontal:15,
        textAlign:'center'
    },
    bio:{
        color:'gray',
        fontSize:17,
        marginTop:5
    },
    data_container:{
        width:'100%',
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        paddingVertical:7,
        paddingHorizontal:10,
        marginTop:10,
        borderColor:'gray',
        borderBottomWidth: 0.5,
        borderTopWidth: 0.5,
    },
    followers:{
        display:'flex',
        alignItems:'center',
        flex:1,
        // borderColor:'black',
        // borderWidth:1,
    },
    followers_text:{
        fontSize:17,
        color:'gray'
    },
    followers_count:{
        fontSize: 17
    },
    tabs:{
        width:'100%',
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        paddingVertical:7,
        paddingHorizontal: 25,  //57for three icons
         borderColor:'gray',
        //  borderTopWidth: 1,
    },
    tabs_text:{
        fontSize:17,
        color:'black'  
    },
    upload:{
     width:'100%',
     display:'flex',
     justifyContent:'center',
     paddingHorizontal:10,
     height:60,
    //  borderColor:'rgba(0,0,0,0.1)',
    //  borderBottomWidth: 15,
    },
    upload_text:{
        color:'gray',
        fontSize:20,
        fontWeight:'600',
    }
})

const GET_USER_QUESTIONS = gql `
query user_questions($id:Int!){
    user(id:$id){
        first_name
        last_name
        fb_id
        profile_pic
        questions{
            id
            question
            img
            choices
            answer
            time
        }
    }
}`

function Profile(props) {
    console.log(props.route.params.id)
    // const [loading,setLoading]=useState(true)
    const { loading, error, data,refetch } = useQuery(GET_USER_QUESTIONS,{variables:{id:2145 }});
    const [questions,setQuestions]=useState([])
    const [err, setErr] = useState(false) 
    const [refreshing, setRefreshing] = useState(false);
    

    const ProfileHeader=({user})=>(
        <View style={styles.container}>
            <Image style={styles.profile_img} source={{uri:user.profile_pic}}/>
            <Text style={styles.profile_name}>{user.first_name} {user.last_name}</Text>
            <Text style={styles.bio}>Born to Die</Text>
            <View style={styles.data_container}>
                <View style={styles.followers}>
                    <Text style={styles.followers_count}>50</Text>
                    <Text style={styles.followers_text}>Followers</Text>
                </View>
                <View style={styles.followers}>
                    <Text style={styles.followers_count}>150</Text>
                    <Text style={styles.followers_text}>Points</Text>
                </View>
                <View style={styles.followers}>
                    <Text style={styles.followers_count}>21</Text>
                    <Text style={styles.followers_text}>Rank</Text>
                </View>
            </View>
             {/* <View style={styles.tabs}>
                <MaterialCommunityIcons name="home" color={'blue'} size={30} />
                <MaterialCommunityIcons name="heart" color={'gray'} size={30} />
                <MaterialCommunityIcons name="bookmark" color={'gray'} size={30} />
                <MaterialCommunityIcons name="cog" color={'gray'} size={30} />
            </View> */}
            {/* <View style={styles.upload}>
                <Text style={styles.upload_text}>What's your question?</Text>
            </View> */}
        </View>
    )



    if(err || error) return <Err refreshing={refreshing} setRefreshing={setRefreshing}/>
    if(loading || refreshing) return <><Header/><Loading/></>
    console.log(data)
    var user=data.user
    user.profile_pic = 'https://i.stack.imgur.com/l60Hf.png'
    if(user.fb_id){
        user.profile_pic = `https://graph.facebook.com/v9.0/${user.fb_id}/picture?type=large`
        console.log(profile_pic)
    }
    // setRefreshing(false)
    // console.log(data.userQuestions)
    return (
        // <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={()=>{refetch()}} />}>
        <>   
        {/* <Header drawer_navigation={drawer_navigation}/> */}
            <FlatList
                style={{width:'100%',backgroundColor:'white'}}
                // ListHeaderComponent={()=><ProfileHeader user={user}/>}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={()=>{refetch()}} />}
                data={(data.user.questions)}            
                renderItem={({item})=><Question {...item}  />}
                // keyExtractor={()=>uuid()}
                />
        </>
        // </ScrollView>
    )
}

export default Profile
