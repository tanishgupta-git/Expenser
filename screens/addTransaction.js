import React, { useState } from "react";
import {StatusBar,Text,TouchableOpacity,View,Keyboard,TouchableWithoutFeedback,Image,ActivityIndicator,} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import SharedStyles from "../styles/shared";
import { db, auth } from "../firebase/config";
import firebase from "firebase";
import styles from "../styles/form";
import moment from "moment";
import QuestTransType from "../components/questTransType";
import QuestPayeeName from "../components/questPayeeName";
import QuestCategoryType from "../components/questCategoryType";
import QuestAmount from "../components/questAmount";

const AddTransaction = ({ navigation }) => {
  const [typeTrans, setTypeTrans] = useState();
  const [transTitle, setTransTitle] = useState();
  const [thirdQuestion, setThirdQuestion] = useState(false);
  const [category, setCategory] = useState();
  const [amount, setAmount] = useState();
  const [loading, setLoading] = useState(false);

  const submitCategory = (category) => {
    setCategory(category);
  };

  const submitHandler = async () => {
    Keyboard.dismiss();
    const user = auth?.currentUser?.email;
    const date = moment(new Date()).format("DD-MMM");
    const yearMonth = moment(new Date()).format("YYYY-MMM")

    setLoading(true);
    // adding transaction in the collection
    const docRef = await db
      .collection("expenses")
      .doc(user)
      .collection(yearMonth)
      .doc(date)
      .collection('transactions')
      .add({
        title: transTitle,
        category: category,
        amount,
        type: typeTrans,
        timeStamp : firebase.firestore.FieldValue.serverTimestamp()
      });
 
    // getting the previous amount for next update
    const prevAmountDoc = await db
    .collection("expenses")
    .doc(user)
    .collection(yearMonth)
    .doc(date)
    .get()

    // if added for first time then intialized it with zero 
    let Income = (prevAmountDoc.data()?.income) ? prevAmountDoc.data().income : 0;
    let Expense = (prevAmountDoc.data()?.expense) ? prevAmountDoc.data().expense : 0;
    // update the new values
    if (typeTrans === 'Income') {
       Income = Income + Number(amount);
    }else {
       Expense = Expense + Number(amount)
    }

    //  updating the document with new amount value
    await db.collection("expenses")
    .doc(user)
    .collection(yearMonth)
    .doc(date)
    .set({
      income : Income,
      expense : Expense,
      total : Income - Expense
    })
    navigation.replace("TransDetail", {
      id: docRef.id,
    });

    
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        {loading && (
          <View style={SharedStyles.loadingContainer}>
            <ActivityIndicator size="large" color="#FF3378" />
          </View>
        )}
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Entypo name="cross" size={30} color="black" />
          </TouchableOpacity>
          <Text style={styles.headingPage}>Add transaction</Text>
        </View>
        <View style={styles.formQuestions}>
          {/* first question */}
          {!typeTrans && <QuestTransType setTypeTrans={setTypeTrans} />}

          {typeTrans && (
            <View style={{ flex: 1, justifyContent: "space-between",padding:20 }}>
              <View style={styles.transDetails}>
                <View style={styles.transDetail}>
                  <AntDesign
                    name={
                      typeTrans === "Expense" ? "rightcircle" : "leftcircle"
                    }
                    size={50}
                    color={typeTrans === "Expense" ? "#FF3378" : "#33C9FF"}
                  />
                  <View style={styles.transTextContainer}>
                    <Text style={styles.transTextHead}>Transaction Type</Text>
                    <Text style={styles.transText}>{typeTrans}</Text>
                  </View>
                </View>
                {thirdQuestion && (
                  <View style={styles.transDetail}>
                    {category ? (
                      category === "Cash" ? (
                        <View style={styles.transCatimageContainer}>
                          <Image
                            style={styles.transCatimage}
                            source={require("../assets/cash.png")}
                          />
                        </View>
                      ) : (
                        <View style={styles.transCatimageContainer}>
                          <Image
                            style={styles.transCatimage}
                            source={require("../assets/bank.png")}
                          />
                        </View>
                      )
                    ) : (
                      <View style={styles.transCatimagePlaceholder}></View>
                    )}
                    <View style={styles.transTextContainer}>
                      <Text style={styles.transTextHead}>Payee Name</Text>
                      <Text style={styles.transText}>{transTitle}</Text>
                    </View>
                  </View>
                )}
              </View>

          {/* second question */}
              {!thirdQuestion && (
                <QuestPayeeName
                  transTitle={transTitle}
                  setTransTitle={setTransTitle}
                  setThirdQuestion={setThirdQuestion}
                />
              )}
              {/* third question  */}
              {thirdQuestion && !category && (
                <QuestCategoryType submitCategory={submitCategory} />
              )}

              {/* fourth question */}
              {thirdQuestion && category && (
                <QuestAmount
                  amount={amount}
                  setAmount={setAmount}
                  submitHandler={submitHandler}
                />
              )}
            </View>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AddTransaction;
