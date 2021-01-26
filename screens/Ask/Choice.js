import React from 'react'
import { StyleSheet,TextInput, View,TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const styles=StyleSheet.create({
    choice:{
        borderRadius: 20,
        width: '95%',
        height:40,
        borderColor:'rgba(34,36,38,.15)',
        borderWidth:1, 
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        overflow:'hidden',
        paddingHorizontal:10,
        marginBottom:10
        // flex:1,
        // fontSize:15,
        // margin:5,
        // padding: 8, 
        // paddingLeft:17, 
    },
    choice_input:{
        width:'90%',
    }
})
function Choice(props) {
    const handleChoiceChange = (txt) => {
    props.setChoices((choices)=>{
        var choices_tmp = choices.slice()
        choices_tmp[props.index] = txt
        // console.log(choices_tmp)
        return choices_tmp
    })}
    const rmChoice = () => {
        props.setChoices((choices) => {
            var tmp = choices.slice()
            console.log(tmp)
            console.log(props.index)
            tmp.splice(props.index, 1);
            console.log(tmp)
            return tmp
        })
    }
    return (
        <View style={styles.choice}>
            <TextInput  onChangeText={(txt)=>handleChoiceChange(txt,props.index,props.setChoices)} style={styles.choice_input} value={props.choices[props.index]} underlineColorAndroid="transparent" color='black' placeholder={'Choice '+(props.index+1)}/>
            <TouchableOpacity onPress={rmChoice} style={styles.close_icon}>
                {props.choices.length>2 && <MaterialCommunityIcons style={styles.searchIcon} name="close" color='green' size={24} />}
            </TouchableOpacity>
        </View>
    )
}

export default Choice
