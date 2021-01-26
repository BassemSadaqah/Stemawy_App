import React from 'react'
import {View,Text,StyleSheet,Image} from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Input from '../components/Input'

const styles=StyleSheet.create({
    header:{
        backgroundColor:'#222222',
        height:50,
        display:'flex',
        alignItems:'center',
        justifyContent:'space-between',
        flexDirection:'row',
        paddingHorizontal:10,
    },
    search:{
        backgroundColor:'white',
        width:'70%',
        height:30,
        borderRadius:15,
        paddingHorizontal:15,
        paddingVertical:0,
        marginLeft:-10,
    },
    profile_img: {
        width: '9%',
        borderRadius: 1000,
        aspectRatio: 1,
        // marginRight: 20,
    },
})
function Header({drawer_navigation}) {
    return (
        <View style={styles.header}>
            <MaterialCommunityIcons onPress={()=>drawer_navigation.openDrawer()} name="menu" color={'#fff'} size={32} />
            <Input style={styles.search} placeholder='Search'/>
            <Image style={styles.profile_img} source={{uri:'https://bit.ly/37taX4X'}}/>

        </View>
    )
}

export default Header
