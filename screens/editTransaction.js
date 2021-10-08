import { StyleSheet, Text, View,TextInput,Alert,Keyboard,TouchableWithoutFeedback,ActivityIndicator } from 'react-native'
import React,{useEffect,useState} from 'react';
import {db,auth} from '../firebase/config';
import moment from 'moment';
import HomeStyles from '../styles/home';
import QuestAmount from '../components/questAmount';
import formStyles from '../styles/form';
import SharedStyles from '../styles/shared';

const EditTransaction = ({navigation,route}) => {

    const {id} = route.params;

    const [transTitle,setTransTitle] = useState("");
    const [newAmount,setNewAmount] = useState(0);
    const [loading,setLoading] = useState(false);
    const [detail, setDetail] = useState({});

    useEffect(() => {
      const user = auth?.currentUser?.email;
      const transDate = moment(new Date()).format("DD-MMM");
      const transMonth = moment(new Date()).format("YYYY-MMM")

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
          setTransTitle(doc.data().title);
          setNewAmount(doc.data().amount);
          setLoading(false)
        });
    }, []);

    const submitHandler = async () => {
        if (!transTitle) {
            Alert.alert("Plese enter title");
            return;
        }
        if( Number(newAmount) < 0 ) {
            console.log(typeof(newAmount));
            Alert.alert("Plese enter a positive amount");
            return;
        }
        setLoading(true);
        const user = auth?.currentUser?.email;
        const transDate = moment(new Date()).format("DD-MMM");
        const transMonth = moment(new Date()).format("YYYY-MMM");
        await db.collection("expenses").doc(user).collection(transMonth).doc(transDate).collection("transactions").doc(id)
        .update({
              title : transTitle,
              amount : Number(newAmount),
          })
         
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
       Income = Income + Number(newAmount) - detail.amount;
    }else {
       Expense = Expense + Number(newAmount) - detail.amount;
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

    navigation.navigate("TransDetail", {
    id: id,
    transDate : moment(new Date()).format("DD-MMM"),
    transMonth: moment(new Date()).format("YYYY-MMM"),
    editShow : true
    })
        
    }



    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={HomeStyles.container}>
            
            
            {
            loading && (
                <View style={SharedStyles.loadingContainer}>
                    <ActivityIndicator size="large" color="#FF3378" />
                </View>
            )}

            <View style={styles.editForm}>
                    {/* enter payee name and amount */}
                    <View style={styles.payeeInputContainer}>
                        <Text style={formStyles.textInputLabel} >Title</Text>
                        <TextInput style={formStyles.textInput} 
                                placeholder="Enter Title" 
                                placeholderTextColor="#DFE0E3"
                                onChangeText={(value) => setTransTitle(value)}
                                value={transTitle} 
                                />
                    </View>
                    <QuestAmount amount={newAmount} submitHandler={submitHandler} setAmount={setNewAmount} />
            </View>

            </View>
        </TouchableWithoutFeedback>
    )
}

export default EditTransaction

const styles = StyleSheet.create({
    editForm : {
        padding: 20,
        paddingTop : 0
    },
     payeeInputContainer : {
         marginVertical : 20
     }
})