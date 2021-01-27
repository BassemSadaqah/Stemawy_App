import React from 'react'
import {View,Text,Image,FlatList,RefreshControl,StyleSheet} from 'react-native'
import Loading from '../components/Loading'
import Header from '../components/Header'
import {gql,useQuery} from '@apollo/client'

const styles=StyleSheet.create({
    main:{
        backgroundColor:'white',
        display:'flex',
        flex:1,
    },
    board:{
        marginHorizontal:15,
        display:'flex',
        flexDirection:'row',
        padding:15,
        marginVertical: 5,
        borderRadius:15,
        fontWeight:'700',
        backgroundColor: 'white',
        // backgroundColor: '#f8f8f8',
        // backgroundColor: '#ffcc00',
        // justifyContent:'space-between',
        alignItems:'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 6,
    },
    name:{
        fontSize:17,
        fontWeight:'bold'
    },
    img:{
        aspectRatio:1,
        width:55,
        borderRadius:100,
    },
    points:{
        fontSize:17,
        fontWeight:'bold',
        textAlign:'right',
        position:'absolute',
        right:15,
    },
    img_container:{
        marginRight:15,
    },
    rank:{
        position:'absolute',
        backgroundColor:'orange',
        color:'white',
        fontSize:15,
        zIndex:10,
        borderRadius:100,
        textAlign:'center',
        textAlignVertical:'center',
        alignSelf:'center',
        aspectRatio:1,
        borderWidth:3,
        borderColor:'white',
        // padding:10,
        // height:27,
        width:28,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        bottom:-14,
    }
})
const Board=(props)=>{
        let background='white'
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
        return(
        <View style ={styles.board} backgroundColor = {background}>
            <View style={styles.img_container}>
                <Text style={styles.rank}>{props.index+1}</Text>
                <Image style={styles.img} source={{uri:'https://images-na.ssl-images-amazon.com/images/I/81YDuTWSHyL.png'}}/>   
            </View>
            <Text style={styles.name}>{props.item.first_name} {props.item.last_name}</Text>
            <Text style={styles.points}>{props.item.points}</Text>
        </View>
        )}        
    
const LeaderBoardQuery=gql`
query leaderboard($count: Int) {
    leaderboard(count:$count){
        first_name
        last_name
        email
        points
    }
}
`
function Leaderboard() {
    const {loading,error,data,refetch}=useQuery(LeaderBoardQuery,
        {variables:{count:1},
        // fetchPolicy: 'cache-and-network',
        // pollInterval:10000
    })
    // console.log(data.leaderboard[0])
    if(loading) return <Loading/>
    console.log(data.leaderboard[0])
    return (
        <>
        <Header/>
        <View style={styles.main}>
            <FlatList
                style={{paddingTop:15}}
                data={data.leaderboard}
                renderItem={(item)=><Board {...item}/>}
                refreshControl={<RefreshControl refreshing={loading} onRefresh={refetch}/>}

            />
        </View>
        </>
    )
}

export default Leaderboard
