import React from 'react'
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import homeStyles from '../styles/home';
import { Feather } from '@expo/vector-icons';

const Profile = () => {
    return (
        <View style={homeStyles.container}>
            <View style={homeStyles.header}>
                <Text style={homeStyles.headingPage}>Profile</Text>
                <TouchableOpacity>
                    <Feather name="search" size={24} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Profile

const styles = StyleSheet.create({})
