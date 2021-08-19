import React from 'react'
import { Text, View,TouchableOpacity,TextInput } from 'react-native'
import styles from '../styles/form';
import { AntDesign } from '@expo/vector-icons';

const QuestPayeeName = ({transTitle,setTransTitle,setThirdQuestion}) => {
    return (
        <View style={styles.inputFormContainer}>
            <View style={styles.textInputContainer}>
                <Text style={styles.textInputLabel} >Payee Name</Text>
                <TextInput style={styles.textInput} 
                        placeholder="Enter Payee Name" 
                        placeholderTextColor="#DFE0E3"
                        onChangeText={(value) => setTransTitle(value)}
                        value={transTitle} 
                        autoFocus

                        />
            </View>
            <TouchableOpacity onPress={() => setThirdQuestion(true)} style={transTitle ? styles.formsubmitButton : {...styles.formsubmitButton ,backgroundColor:'#CFD4E6'}} disabled={!transTitle}>
                <Text><AntDesign name="right" size={20} color="#ffffff" /></Text>
            </TouchableOpacity>
        </View>
    )
}

export default QuestPayeeName;
