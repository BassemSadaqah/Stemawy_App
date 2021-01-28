import React,{useContext} from 'react'
import {View,Text,StyleSheet,Image} from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Input from '../components/Input'
import {userContext} from '../App'

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
        width: 38,
        borderRadius: 1000,
        aspectRatio: 1,
        // marginRight: 20,
    },
})
function Header({drawer_navigation}) {
    const {user} = useContext(userContext)
    return (
        <View style={styles.header}>
            <MaterialCommunityIcons onPress={()=>drawer_navigation.openDrawer()} name="menu" color={'#fff'} size={32} />
            <Input style={styles.search} placeholder='Search'/>
            <Image style={styles.profile_img} source={{uri:user.profile_pic?user.profile_pic:'https://i.stack.imgur.com/l60Hf.png'}}/>

        </View>
    )
}

export default Header
