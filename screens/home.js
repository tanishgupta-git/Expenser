import React, { useState, useEffect } from "react";
import {ScrollView,StatusBar,StyleSheet,Text,TouchableOpacity,View} from "react-native";
import { Feather } from "@expo/vector-icons";
import homeStyles from "../styles/home";
import { auth, db } from "../firebase/config";
import moment from "moment";

const Home = ({ navigation }) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const user = auth?.currentUser?.email;
    const date = moment(new Date()).format("DD-MMM");
    const yearMonth = moment(new Date()).format("YYYY-MMM");

    const unsubscribe = db
    .collection("expenses")
    .doc(user)
    .collection(yearMonth)
    .doc(date)
    .collection('transactions').onSnapshot((snap) => {
     setTransactions(snap.docs.map((doc) => ({id:doc.id,...doc.data()})));
    })

    return () => unsubscribe();
 
  }, []);

  return (
    <ScrollView style={homeStyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <View style={homeStyles.header}>
        <Text style={homeStyles.headingPage}>Daily transaction</Text>
        <TouchableOpacity onPress={() => auth.signOut()}>
          <Feather name="search" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View>
          {transactions.map((transaction) => (
            <View key={transaction.id}>
               <Text>{transaction.title}</Text>
            </View>
          ))}
      </View>
      <View>
         <Text>Total</Text>
         <Text></Text>
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({});
