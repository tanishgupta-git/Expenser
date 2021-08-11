import React from 'react'
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Feather } from '@expo/vector-icons';
import homeStyles from '../styles/home';
import {auth } from '../firebase/config';


const Home = ({navigation}) => {

    return (
        <View style={homeStyles.container}>

            <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
            <View style={homeStyles.header}>
                <Text style={homeStyles.headingPage}>Daily transaction</Text>
                <TouchableOpacity onPress={() => auth.signOut() }>
                    <Feather name="search" size={24} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
})
