import React, { useState } from "react";
import {StyleSheet,Text,View,TouchableOpacity,Image,TextInput,Alert,ActivityIndicator} from "react-native";
import formStyles from "../styles/form";
import SharedStyles from '../styles/shared';
import { AntDesign } from "@expo/vector-icons";
import { db,auth } from '../firebase/config'
import firebase from "firebase";
import moment from "moment";
import QuestCategoryType from "../components/questCategoryType";

const CreateBudget = ({navigation}) => {
  const [category, setCategory] = useState();
  const [amount, setAmount] = useState();
  const [title, setTitle] = useState();
  const [uploading,setUploading] = useState(false);

  const submitCategory = (category) => {
    setCategory(category);
  };

  const submitHandler = () => {
    if (!title) {
      Alert.alert("Please Enter Title");
    }
    setUploading(true);
    // db code goes here
    const user = auth?.currentUser?.email;
    const expYearMonth = moment(new Date()).format("YYYY-MMM");
    db.collection("budgets").doc(user).collection(expYearMonth).doc("budget").collection("budgets").add({
        title: title,
        category: category,
        amount:Number(amount),
        timeStamp : firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
        setUploading(false);
        navigation.navigate("Budget");
    })
  };

  return (
    <View style={styles.container}>

     { uploading && (
                <View style={SharedStyles.loadingContainer}>
                    <ActivityIndicator size="large" color="#FF3378" />
                </View>
                )
     }
      {
       !category 
       ?  
       <QuestCategoryType submitCategory={submitCategory} />

       : 
       <View>
                <View style={styles.inputsContainer}>
                    <Text style={formStyles.textInputLabel}>Category Choosen</Text>
                    <Text style={styles.categoryText}>{category}</Text>
                </View>
                <View style={styles.inputsContainer}>
                <View style={styles.titleContainer}>
                  <Text style={formStyles.textInputLabel}>Budget Name</Text>
                  <TextInput
                    style={formStyles.textInput}
                    placeholder="Enter Budget Name"
                    placeholderTextColor="#DFE0E3"
                    onChangeText={(value) => setTitle(value)}
                    value={title}
                  />
                </View>

                <View style={formStyles.inputFormContainer}>
                  <View style={formStyles.textInputContainer}>
                    <Text style={formStyles.textInputLabel}>Enter Amount</Text>
                    <TextInput
                      style={formStyles.textInput}
                      placeholder="Amount in Rs."
                      placeholderTextColor="#DFE0E3"
                      onChangeText={(value) => setAmount(value)}
                      value={amount}
                      keyboardType="numeric"
                    />
                  </View>
                  <TouchableOpacity
                    onPress={submitHandler}
                    style={
                      amount
                        ? formStyles.formsubmitButton
                        : {
                            ...formStyles.formsubmitButton,
                            backgroundColor: "#CFD4E6",
                          }
                    }
                    disabled={!amount}
                  >
                    <Text style={formStyles.amountButtontext}>
                      <Text>
                        <AntDesign name="right" size={20} color="#ffffff" />
                      </Text>
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

        </View>
      }

    </View>
  );
};

export default CreateBudget;

const styles = StyleSheet.create({
  container : {
    flex: 1,
    backgroundColor : '#FCFCFC',
    paddingTop:20
  },
  inputsContainer : {
      paddingHorizontal : 20,
      paddingVertical : 10
  },
  titleContainer:{
      marginBottom : 30
  },
  categoryContainer : {
    marginVertical : 10
  },
  categoryText : {
    fontSize : 20,
    fontWeight : 'bold'
  }
});
