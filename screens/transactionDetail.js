import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image,ScrollView,ActivityIndicator } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { db, auth } from "../firebase/config";
import SharedStyles from '../styles/shared';


const TransactionDetail = ({ navigation, route }) => {
  const { id,transDate,transMonth,editShow } = route.params;
  const [detail, setDetail] = useState({});
  const [loading,setLoading] = useState(false);

  useEffect(() => {
    const user = auth?.currentUser?.email;
    setLoading(true);
    db.collection("expenses")
      .doc(user)
      .collection(transMonth)
      .doc(transDate)
      .collection("transactions")
      .doc(id)
      .get()
      .then((doc) => {
        setDetail({ ...doc.data() });
        setLoading(false);
      });
      


  }, [route]);


  const deleteHandler = async () => {
        const user = auth?.currentUser?.email;
        setLoading(true);
        await db.collection("expenses")
        .doc(user)
        .collection(transMonth)
        .doc(transDate)
        .collection("transactions")
        .doc(id).delete();

        // getting the previous amount for next update
        const prevAmountDoc = await db
        .collection("expenses")
        .doc(user)
        .collection(transMonth)
        .doc(transDate)
        .get()
    
        // if added for first time then intialized it with zero 
        let Income = prevAmountDoc.data().income;
        let Expense = prevAmountDoc.data().expense;
    
        // update the new values
        if (detail.type === 'Income') {
           Income = Income - detail.amount;
        }else {
           Expense = Expense - detail.amount;
        }
    
        //  updating the document with new amount value
        await db.collection("expenses")
        .doc(user)
        .collection(transMonth)
        .doc(transDate)
        .set({
          income : Income,
          expense : Expense,
          total : Income - Expense
        })
        setLoading(false); 
        navigation.navigate("Home",{
           date : new Date(transDate + "-" + transMonth.split("-")[0]).toDateString()
        });

  }

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text>
          <Entypo name="cross" size={40} color="#404040" />
        </Text>
      </TouchableOpacity>

      {
            loading && (
                <View style={SharedStyles.loadingContainer}>
                    <ActivityIndicator size="large" color="#FF3378" />
                </View>
            )
      }


      {/* if added on same day than edit that transaction */}      
      {
          editShow &&
          <View style={styles.imageContainer}>
          <Image
            style={styles.congoImage}
            source={require("../assets/congratulations.png")}
          />
          <Text style={styles.congoHeading}>Congratulation!</Text>
          <Text style={styles.congoText}>
            Your transaction is added successfully to the app
          </Text>
        </View>
      }
      
      <View style={styles.transDetails}>

        <View style={styles.transFlexDetail}>
        <View>
          <Text style={styles.detailHead}>Payee</Text>
          <Text style={styles.detailText}>{detail.title}</Text>
        </View>
          <View>
          <Text style={styles.detailHead}>Category</Text>
          <Text style={styles.detailText}>{detail.category}</Text>
          </View>
        </View>
        <View style={styles.transFlexDetail}>
          <View>
            <Text style={styles.detailHead}>Transaction type</Text>
            <Text style={styles.detailText}>{detail.type}</Text>
          </View>
          <View>
            <Text style={styles.detailHead}>Date</Text>
            <Text style={styles.detailText}>
              {transDate + "-" + transMonth.split("-")[0]}
            </Text>
          </View>
        </View>

        <View style={styles.transAmountDetail}>
            <View>
              <Text style={styles.detailHead}>Amount</Text>
              <Text style={styles.detailText}>Rs. {detail.amount}</Text>
            </View>

          {/* if added on same day than edit that transaction */}
          {
            editShow &&
            <View>
                <TouchableOpacity style={styles.transEditButton} onPress={() => {
                  navigation.navigate("EditTransaction",{
                    id : id
                  })
                }}>
                  <Text style={styles.transEditText}>Edit</Text>
                </TouchableOpacity>
          </View>
          }


        </View>
        
        <TouchableOpacity style={SharedStyles.themeButton} onPress={deleteHandler}>
            <Text style={SharedStyles.themeButtonText}>Delete</Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
};

export default TransactionDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FCFCFC",
  },
  congoImage: {
    width: 170,
    height: 170,
  },
  congoHeading: {
    fontSize: 28,
    fontWeight: "bold",
    marginVertical: 30,
    color: "#1B202E",
  },
  congoText: {
    color: "#A7A8AE",
    fontSize: 18,
    textAlign: "center",
    width: 350,
  },
  imageContainer: {
    marginVertical: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  transDetails: {
    backgroundColor: "#ffffff",
    elevation: 1,
    borderRadius: 15,
    padding: 25,
    marginVertical : 20
  },
  detailHead: {
    color: "#afb2b6",
  },
  detailText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#323642",
    marginTop: 5,
  },
  transFlexDetail: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 25,
  },
  transEditButton: {
    padding: 15,
    width: 80,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#FF3378",
    alignItems: "center",
  },
  transEditText: {
    color: "#FF3378",
    fontWeight: "bold",
    fontSize: 16,
  },
  transAmountDetail: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 25,
    paddingHorizontal: 10,
    marginVertical :10,
    borderRadius: 2,
    borderWidth: 2,
    borderColor: "#cccccc",
    borderStyle: "dashed",
  },
});
