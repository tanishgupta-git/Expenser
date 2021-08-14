import React from 'react'
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'

const TransictionDetail = ({navigation}) => {
    return (
        <View>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text>Go Back</Text>
            </TouchableOpacity>
        </View>
    )
}

export default TransictionDetail

const styles = StyleSheet.create({})
