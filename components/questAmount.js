import React from "react";
import { Text, View,TextInput,TouchableOpacity } from "react-native";
import styles from '../styles/form';

const QuestAmount = ({amount,submitHandler,setAmount}) => {
  return (
    <View style={styles.inputFormContainer}>
      <View style={styles.textInputContainer}>
        <Text style={styles.textInputLabel}>Enter Amount</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Amount in Rs."
          placeholderTextColor="#DFE0E3"
          onChangeText={(value) => setAmount(value)}
          value={amount}
          keyboardType="numeric"
          autoFocus
        />
      </View>
      <TouchableOpacity
        onPress={submitHandler}
        style={
          amount
            ? { ...styles.formsubmitButton, width: 100 }
            : {
                ...styles.formsubmitButton,
                backgroundColor: "#CFD4E6",
                width: 100,
              }
        }
        disabled={!amount}
      >
        <Text style={styles.amountButtontext}>Finish</Text>
      </TouchableOpacity>
    </View>
  );
};

export default QuestAmount;
