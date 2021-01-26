import React from 'react'
import {View,ActivityIndicator} from 'react-native'
function Loading() {
    return (
        <View style={{flex:1,justifyContent:'center'}}>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
    )
}

export default Loading
