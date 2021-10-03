import React from 'react'
import { StyleSheet, Text, View,TouchableOpacity} from 'react-native'
import homeStyles from '../styles/home';
import { Ionicons } from '@expo/vector-icons';

const Budget = ({navigation}) => {
    return (
        <View style={homeStyles.container}>
            <View style={homeStyles.header}>
                <Text style={homeStyles.headingPage}>Budget</Text>
                <TouchableOpacity onPress={() => navigation.navigate("CreateBudget")}>
                        <Ionicons name="add" size={32} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Budget

const styles = StyleSheet.create({})
