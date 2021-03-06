import React, { useState, useEffect } from "react";
import { ScrollView,StatusBar, StyleSheet,Text,TouchableOpacity, View, ActivityIndicator} from "react-native";
import homeStyles from "../styles/home";
import sharedStyles from "../styles/shared";
import { auth, db } from "../firebase/config";
import moment from "moment";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Transaction from "../components/transaction";

const Home = ({ navigation,route }) => {

  const prevDate = route.params?.date ? route.params.date : new Date();
  const [transactions, setTransactions] = useState([]);
  const [total, setTotal] = useState(0);
  const [date, setDate] = useState(prevDate);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [loading, setLoading] = useState(false);

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setDate(date);
    hideDatePicker();
  };

  const onClickTransaction = (id) => {
       navigation.navigate("TransDetail", {
        id: id,
        transDate : moment(date).format("DD-MMM"),
        transMonth: moment(date).format("YYYY-MMM"),
        editShow : false
      })
  }

  useEffect(() => {
    let unsubscribe,unsubscribe2;
    (async () => {
      setLoading(true);
      const user = auth?.currentUser?.email;
      const expDate = moment(date).format("DD-MMM");
      const expYearMonth = moment(date).format("YYYY-MMM");

      unsubscribe = db
        .collection("expenses")
        .doc(user)
        .collection(expYearMonth)
        .doc(expDate)
        .collection("transactions")
        .orderBy('timeStamp','desc')
        .onSnapshot((snap) => {
          setTransactions(
            snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
          );
        });

      unsubscribe2  = db.collection("expenses").doc(user).collection(expYearMonth).doc(expDate).onSnapshot((totalDocref) => {
        if (totalDocref) {
          setTotal(totalDocref?.data()?.total);
       }
      })

      setLoading(false);
      
    })();
    return () => { 
      unsubscribe();
      unsubscribe2();
    }
  }, [date]);

  return (
    <ScrollView style={homeStyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <View style={homeStyles.header}>
        <Text style={homeStyles.headingPage}>Daily transaction</Text>
      </View>


      {/* chooose date */}
      <TouchableOpacity style={{...sharedStyles.themeButton,marginHorizontal:10}}  onPress={() => setDatePickerVisibility(true)} >
        <Text style={sharedStyles.themeButtonText} >Choose Date</Text>
      </TouchableOpacity>

    {/* loader Container */}
      {loading && (
          <ActivityIndicator size="large" color="#FF3378" />
      )}

      {/* list transactions on that date */}
      <View >
      <Text style={styles.currentDate}>{moment(date).format("DD-MMM-YYYY")}</Text>
       {
         !transactions.length &&
          <View style={styles.noTransactions}>
             <Text style={styles.noTransactionsText}>No transactions on this date</Text>
          </View>
       }
        {
              transactions.map((transaction) => (
                   <Transaction key={transaction.id} transaction={transaction} id={transaction.id} onClickTransaction={onClickTransaction} />
            ))
        }
        
      </View>
      {/* total transaction on that day */}
      <View style={styles.totalContainer}>
        <Text style={styles.totalHeading}>Total</Text>
        <Text style={styles.totalAmount}>Rs. {total  ? total : 0}</Text>
      </View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        maximumDate={new Date()}
        minimumDate={new Date(2021, 8, 1)}
        date={date}
      />
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  noTransactions : {
    height: 350,
    justifyContent:'center',
    alignItems:'center'
  },
  noTransactionsText : {
    fontSize:18,
    color: '#ADAEB4'

  },
  currentDate : {
    marginVertical : 20,
    paddingHorizontal: 20,
    fontSize : 18,
    color: '#808080'
  },
  totalContainer : {
    flexDirection : 'row',
    justifyContent : 'space-between',
    paddingHorizontal:20,
    marginVertical :40
  },
  totalHeading : {
    color : '#ADAEB4',
    fontSize:18
  },
  totalAmount : {
    color:  '#000000',
    fontSize:18,
    fontWeight:'bold',
    marginRight:5
  }
});