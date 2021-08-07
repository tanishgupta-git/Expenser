import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { auth } from '../firebase/config';

const Home = ({navigation}) => {
    const pressHandler = () => {
        auth.signOut();
        navigation.navigate("Login");
    }
    return (
        <View>
            <Text>Hello From The Home</Text>
            <TouchableOpacity onPress={pressHandler}><Text>Logout</Text></TouchableOpacity>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({})
