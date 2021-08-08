import React from 'react'
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { auth } from '../firebase/config';
import { Feather } from '@expo/vector-icons';


const Home = ({navigation}) => {
    const pressHandler = () => {
        auth.signOut();
        navigation.navigate("Login");
    }
    return (
        <View style={styles.container}>

            <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
            <View style={styles.header}>
                <Text style={styles.headingPage}>Daily transaction</Text>
                <TouchableOpacity onPress={pressHandler}>
                    <Feather name="search" size={24} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container : {
        backgroundColor : '#ffffff',
        flex : 1
    },
    header : {
       flexDirection : 'row',
       alignItems : 'center',
       justifyContent : 'space-between',
       padding: 20
    },
    headingPage : {
        fontWeight : 'bold',
        fontSize : 25
    }
})
