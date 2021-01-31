import React from 'react'
import { Text, View ,StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const styles=StyleSheet.create({
    main:{
        display: 'flex',
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor: 'orange',
        width: '100%',
        height: '100%',
        flex: 1,
    },
    welcome_text:{
        fontWeight:'700',
        color:'white',
        textAlign:'center',
        fontSize:62,
    }
})
function Intro({app_name,navigation}) {
    app_name= 'Stemawy';
    return (
        <LinearGradient 
              start={{x: 1, y: 0.8}} end={{x: 0.5, y: 0.}}
            // locations={[1,0.5]}
            colors={[ '#42edd1','#3f9dd0']} 
            // colors={[ '#42edd1','#3f9dd0']} 
            // colors={[ '#42edd1','#3F76D0']} 
            style={styles.main}>
            {/* <View style={styles.main}> */}
                <Text style={styles.welcome_text}>Stemawy</Text>
            {/* </View> */}
        </LinearGradient>
    )
}

export default Intro
