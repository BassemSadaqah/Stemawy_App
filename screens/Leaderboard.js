import React,{useState} from 'react'
import {View,Text,Image,FlatList,RefreshControl,StyleSheet, Touchable, TouchableOpacity} from 'react-native'
import Loading from '../components/Loading'
import Header from '../components/Header'
import {gql,useQuery} from '@apollo/client'
import { useTheme } from '@react-navigation/native';
import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid';


const Board=(props)=>{
        const styles=props.styles
        let background=props.colors.card
        const [profilePic,setProfilePic]=useState(props.item.profile_pic)
        console.log('ddddddddddddddd'+props.colors.dark)
        if(!props.dark){
            if(props.index==0){
                // background = '#ffcc00'
                background = '#fee101'
            }else if(props.index==1){
                // background = '#D7D7D7'
                // background = '#D3D3D3'
                background = '#C0C0C0'
                // background = '#A9A9A9'
                // background = '#808080'
            }else if(props.index==2){
                background = '#D6AD36'
                // background = '#cd7f32'
            }
        }
        return(
        <TouchableOpacity onPress={()=>props.navigation.navigate('Profile',{id:props.item.id})} activeOpacity={0.9}>
            <View style ={styles.board} backgroundColor = {background}>
                <View style={styles.img_container}>
                    <Text style={styles.rank}>{props.index+1}</Text>
                    <Image style={styles.img} onError={()=>setProfilePic('https://i.stack.imgur.com/l60Hf.png')} source={{uri:profilePic}}/>   
                </View>
                <Text style={styles.name}>{props.item.first_name} {props.item.last_name}</Text>
                <Text style={styles.points}>{props.item.points}</Text>
            </View>
        </TouchableOpacity>
        )}        
    
const LeaderBoardQuery=gql`
query leaderboard($count: Int) {
    leaderboard(count:$count){
        id
        first_name
        last_name
        email
        profile_pic
        points
    }
}
`
function Leaderboard(props) {
    const {colors,dark}=useTheme()
    const styles = StyleSheet.create({
        main: {
            // backgroundColor:'white',
            // display:'flex',
            flex: 1,
        },
        board: {
            marginHorizontal: 15,
            display: 'flex',
            flexDirection: 'row',
            padding: 15,
            marginVertical: 5,
            borderRadius: 15,
            fontWeight: '700',
            // backgroundColor: 'white',
            // backgroundColor: '#f8f8f8',
            // backgroundColor: '#ffcc00',
            // justifyContent:'space-between',  
            alignItems: 'center',
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 0,
            },
            shadowOpacity: 0.2,
            shadowRadius: 2,
            elevation: 6,
        },
        name: {
            fontSize: 17,
            fontWeight: 'bold',
            color:colors.text,
        },
        img: {
            aspectRatio: 1,
            width: 55,
            borderRadius: 100,
        },
        points: {
            fontSize: 17,
            fontWeight: 'bold',
            textAlign: 'right',
            position: 'absolute',
            right: 15,
            color:colors.text,
        },
        img_container: {
            marginRight: 15,
        },
        rank: {
            position: 'absolute',
            backgroundColor: 'orange',
            color: 'white',
            fontSize: 15,
            zIndex: 10,
            borderRadius: 100,
            textAlign: 'center',
            textAlignVertical: 'center',
            alignSelf: 'center',
            aspectRatio: 1,
            borderWidth: 3,
            borderColor: 'white',
            // padding:10,
            // height:27,
            width: 28,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            bottom: -14,
        }
    })
    const {loading,error,data,refetch}=useQuery(LeaderBoardQuery,
        {variables:{count:1},
        fetchPolicy: 'cache-and-network',
        // pollInterval:10000
    })
    const drawer_navigation = props.route.params.drawer_navigation
    // console.log(data.leaderboard[0])
    if(loading ) return <><Header  drawer_navigation={drawer_navigation}/><Loading/></>
    console.log(data.leaderboard[0])
    return (
        <>
        <Header drawer_navigation={drawer_navigation}/>
        <View style={styles.main}>
            <FlatList
                style={{paddingTop:15}}
                data={data.leaderboard}
                renderItem={(item)=><Board {...item} navigation={props.navigation} colors={colors} dark={dark} styles={styles}/>}
                refreshControl={<RefreshControl refreshing={loading} onRefresh={refetch}/>}
                keyExtractor={()=>uuid()}

            />
        </View>
        </>
    )
}

export default Leaderboard
