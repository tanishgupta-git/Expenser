import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { db, auth } from "../firebase/config";
import moment from "moment";

const TransictionDetail = ({ navigation, route }) => {
  const { id } = route.params;
  const [detail, setDetail] = useState({});
  useEffect(() => {
    const user = auth?.currentUser?.email;
    const date = moment(new Date()).format("DD-MMM");
    const yearMonth = moment(new Date()).format("YYYY-MMM");

    db.collection("expenses")
      .doc(user)
      .collection(yearMonth)
      .doc(date)
      .collection("transactions")
      .doc(id)
      .get()
      .then((doc) => {
        setDetail({ ...doc.data() });
      });
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text>
          <Entypo name="cross" size={40} color="#404040" />
        </Text>
      </TouchableOpacity>
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
      <View style={styles.transDetails}>
        <View>
          <Text style={styles.detailHead}>Payee</Text>
          <Text style={styles.detailText}>{detail.title}</Text>
        </View>
        <View style={styles.transFlexDetail}>
          <View>
            <Text style={styles.detailHead}>Transaction type</Text>
            <Text style={styles.detailText}>{detail.type}</Text>
          </View>
          <View>
            <Text style={styles.detailHead}>Date</Text>
            <Text style={styles.detailText}>
              {moment(new Date()).format("DD-MMM-YYYY")}
            </Text>
          </View>
        </View>
        <View style={styles.transAmountDetail}>
          <View>
            <Text style={styles.detailHead}>Amount</Text>
            <Text style={styles.detailText}>Rs.{detail.amount}</Text>
          </View>
          <View>
            <TouchableOpacity style={styles.transEditButton}>
              <Text style={styles.transEditText}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default TransictionDetail;

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
    borderRadius: 2,
    borderWidth: 2,
    borderColor: "#cccccc",
    borderStyle: "dashed",
  },
});
