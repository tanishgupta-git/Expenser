import React from 'react'
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import homeStyles from '../styles/home';
import { auth } from '../firebase/config';


const Profile = ({navigation}) => {
    const handleClick = async () => {
        await auth.signOut();
        navigation.navigate('Login');
    }
    return (
        <View style={homeStyles.container}>
            <View style={homeStyles.header}>
                <Text style={homeStyles.headingPage}>Profile</Text>
            </View>
            <TouchableOpacity onPress={handleClick}><Text>Logout</Text></TouchableOpacity>
        </View>
    )
}

export default Profile

const styles = StyleSheet.create({})
