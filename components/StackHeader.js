import React,{useContext} from 'react'
import {View,Text,StyleSheet,Image,TouchableOpacity} from 'react-native'
import Input from '../components/Input'
import {userContext} from '../App'
// import Icon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation,useTheme } from '@react-navigation/native';

function Header(props) {
    const navigation = useNavigation();
    const {colors}=useTheme();
    // console.log(navigation)
    const {user} = useContext(userContext)

    const styles = StyleSheet.create({
        header: {
            // backgroundColor:'#222222',
            borderBottomColor: 'gray',
            // borderBottomWidth:1,
            backgroundColor: colors.card,
            height: 45,
            display: 'flex',
            alignItems: 'center',
            // justifyContent:'',
            flexDirection: 'row',
            paddingHorizontal: 10,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 0,
            },
            shadowOpacity: 0.2,
            shadowRadius: 2.5,
            elevation: 2,
        },
        profile_img: {
            width: 38,
            borderRadius: 1000,
            aspectRatio: 1,
            // marginRight: 20,
        },
        txt: {
            color: colors.text,
            fontSize: 20
        },
        back: {
            marginLeft: 2,
            marginRight: 20
        },
        bell: {
            marginRight: 10
        }
    })
    if(props.showHeader==false) return <></> 
    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={()=>navigation.goBack()} >
                <Icon name="arrowleft" style={styles.back} color={colors.text} size={25} />
            </TouchableOpacity>
            <Text style={styles.txt}>{props.title}</Text>
            {/* <Input style={styles.search} placeholder='Search'/> */}
            {/* <Image style={styles.profile_img} source={{uri:(user.profile_pic?user.profile_pic:'https://i.stack.imgur.com/l60Hf.png')}}/> */}
            < TouchableOpacity>
                {/* <Icon style={styles.bell} name='bell' size={24} color={'black'}/> */}
            </TouchableOpacity>

        </View>
    )
}

export default Header
