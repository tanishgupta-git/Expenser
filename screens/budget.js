import React,{useState,useEffect} from 'react'
import { StyleSheet, Text, View,TouchableOpacity,ScrollView,Image,ActivityIndicator} from 'react-native'
import homeStyles from '../styles/home';
import { Ionicons } from '@expo/vector-icons';
import { db,auth } from '../firebase/config'
import moment from "moment";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import sharedStyles from "../styles/shared";


const Budget = ({navigation}) => {
    const [budgets,setBudgets] = useState([]);
    const [total,setTotal] = useState(0);
    const [date,setDate] = useState(new Date());
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [loading, setLoading] = useState(false);
  
    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };
  
    const handleConfirm = (date) => {
      setDate(date);
      hideDatePicker();
    };

    useEffect(() => {
        const user = auth?.currentUser?.email;
        const expYearMonth = moment(date).format("YYYY-MMM");
        
        setLoading(true);
         db.collection("budgets").doc(user).collection(expYearMonth).doc("budget").collection("budgets").orderBy('timeStamp','desc')
        .get().then((snap) => {
            setBudgets(
              snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
            );
            setTotal( snap.docs.reduce( (x,y) => x + y.data().amount ,0) );
            setLoading(false)
          });  
        
          

    },[date])




    return (
        <ScrollView style={homeStyles.container}>
            <View style={homeStyles.header}>
                <Text style={homeStyles.headingPage}>Budget</Text>
                <TouchableOpacity onPress={() => navigation.navigate("CreateBudget")}>
                        <Ionicons name="add" size={32} color="black" />
                </TouchableOpacity>
            </View>
            
      {/* chooose date */}
      <TouchableOpacity style={sharedStyles.dateButton}  onPress={() => setDatePickerVisibility(true)} >
        <Text style={sharedStyles.dateButtonText} >Choose Date</Text>
      </TouchableOpacity>
        
               
      { 
    loading 
      ?
    <ActivityIndicator size="large" color="#FF3378" />

    : 
    (
        budgets.length 
        ?
        <View style={styles.budgetsContainer}>
                    {
                        budgets.map( budget => (
                            <View  style={styles.budget} key={budget.id}>
                                <View>
                                    <Text style={styles.budgetTitle}>{budget.title}</Text>
                                    <Text style={styles.budgetAmount}>Rs. {budget.amount}</Text>
                                </View>
                            <View style={styles.budgimageContainer}>
                                    {budget.category === "Bank" ? (
                                        <Image
                                        style={styles.budgimage}
                                        source={require("../assets/bank.png")}
                                        />
                                    ) : (
                                        <Image
                                        style={styles.budgimage}
                                        source={require("../assets/cash.png")}
                                        />
                                    )}
                            </View>
                            </View>
                        ))
                        }
            </View>

            :
            <View style={styles.noBudgets}>
                    <Text style={styles.noBudgetsText}>No budgets created</Text>
                </View>
    )
      }
         

        

            <View style={styles.totalBudget}>
               <Text style={styles.totalBudgetHeading}>Current Budget :</Text>
               <Text style={styles.totalBudgetAmount}> Rs. {total}</Text>
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
    )
}

export default Budget

const styles = StyleSheet.create({
    noBudgets : {
        height: 350,
        justifyContent:'center',
        alignItems:'center'
      },
      noBudgetsText : {
        fontSize:18,
        color: '#ADAEB4'
    
      },
      budgetsContainer : {
        padding: 20
      },
      budget : {
          backgroundColor : '#ffffff',
          elevation : 1,
          padding: 15,
          flexDirection :'row',
          justifyContent : 'space-between',
          borderRadius : 20,
          marginVertical : 15
      },
      budgetTitle : {
          color: '#808080',
          fontSize : 16
      },
      budgetAmount : {
        fontSize:20,
        fontWeight : 'bold'
      },
      budgimageContainer: {
        width: 50,
        height: 50,
        backgroundColor: "#F3F3F4",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 30,
      },
      budgimage: {
        width: 30,
        height: 30,
      },
      totalBudget : {
          padding: 20,
          flexDirection :'row',
          justifyContent : 'space-around'
      },
      totalBudgetHeading : {
          fontWeight : 'bold',
          fontSize : 22,
          color: '#808080'
      },
      totalBudgetAmount : {
          fontWeight : 'bold',
          fontSize : 22, 
      }
})
