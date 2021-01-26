import React from 'react'
import {View} from 'react-native'
function Hr(props) {
    return (
    <View
  style={{
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    width:'100%'
  }} {...props}/>
    )
}

export default Hr
