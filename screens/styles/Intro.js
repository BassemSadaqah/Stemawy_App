import { StyleSheet} from 'react-native';

export default  StyleSheet.create({
    Intro:{
        // #1c4606,#88c249
        backgroundColor:'rgba(0,0,32,1)',
        width:'100%',
        height:'100%',
        display:'flex',
        justifyContent:'center',
        alignItems:'center'

    },
    buttons_view:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        bottom:0,
        marginTop:50
    },
    welcome_text:{
        fontWeight:'700',
        color:'white',
        textAlign:'center',
        fontSize:70
    },
    btn:{
        height:40,
        borderRadius:500,
        backgroundColor:'white',
        color:'black'
    },
    btn_text:{
        color:'black',
        fontWeight:'700'
    },
    or:{
        // fontSize:20,
        color:'white',
        fontWeight:'700'

    }
})