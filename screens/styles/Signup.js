import { StyleSheet} from 'react-native';

export default  StyleSheet.create({
    main: {
        backgroundColor:'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent:'center',
        flex:1
    },
    btn: {
        borderRadius: 8,
        fontSize: 11,
        marginTop: 30,
        width:'100%'
    },
    input:{
        width:'95%'
    }
})