import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
    Question: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        borderWidth: 1,
        borderColor: 'grey',
    },
    btn: {
        borderRadius: 20,
        width: '95%',
        height: 40,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'grey',
        margin: 5,
        display: 'flex',
        justifyContent: 'center',
        padding: 10,

    },
    question_text: {
        alignSelf: 'flex-start',
        fontSize: 17,
        marginTop: 10,
        marginBottom: 15,
        marginLeft: 10,
    },
    question_img: {
        width: '100%',
        // height:200,
        marginBottom:10,
        aspectRatio: 1.5
        // resizeMode:'repeat'
    },
    profile_view:{
        padding:10,
        width:'100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    profile_img: {
        width: '12%',
        borderRadius: 10000,
        aspectRatio: 1,
        marginRight:10,
    },
    username:{
        color: '#385898',
        fontWeight:'700',
    },
    since:{
        color: '#616770'
    },
    clicked: {
        backgroundColor: '#a3a0a0'
    }
});
export default styles