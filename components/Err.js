import React from 'react'
import { StyleSheet,TextInput, View,Text,Image,FlatList, TouchableOpacity,ScrollView,RefreshControl } from 'react-native';
import Button from './Button'
const styles=StyleSheet.create({
    main:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        flex:1,
    },
    text:{
        fontSize:20,
        borderWidth:10
    },
    btn:{
        margin:15,
        backgroundColor:'gray'
    }
})

function Err({refreshing,setRefreshing}) {
    return (
        <View style={styles.main}>
                 <RefreshControl style={styles.main}  refreshing={refreshing} onRefresh={()=>{setRefreshing(true)}}>
                <Text style={styles.text}>Something Went Wrong</Text>
                {/* <Text >Check your Internet</Text> */}
                <Button style={styles.btn} onPress={()=>{setRefreshing(true)}}>Refresh</Button>
         </RefreshControl>
            </View>
    )
}

export default Err
