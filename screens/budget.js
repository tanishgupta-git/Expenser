import React,{useState,useEffect} from 'react'
import { StyleSheet, Text, View,TouchableOpacity,ScrollView,Image,ActivityIndicator,Modal,TouchableWithoutFeedback} from 'react-native'
import homeStyles from '../styles/home';
import { Ionicons } from '@expo/vector-icons';
import { db,auth } from '../firebase/config'
import moment from "moment";
import sharedStyles from "../styles/shared";
import MonthPicker from 'react-native-month-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const Budget = ({navigation}) => {
    const [budgets,setBudgets] = useState([]);
    const [total,setTotal] = useState(0);
    const [date,setDate] = useState(new Date());
    const [selectedDate,setSelectedDate] = useState();
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [loading, setLoading] = useState(false);
  
  
    const handleConfirm = () => {
      setDate(selectedDate);
      setDatePickerVisibility(false);
    };

    useEffect(() => {
        const user = auth?.currentUser?.email;
        const expYearMonth = moment(date).format("YYYY-MMM");
        
        setLoading(true);
         db.collection("budgets").doc(user).collection(expYearMonth).doc("budget").collection("budgets").orderBy('timeStamp','desc')
        .onSnapshot((snap) => {
            setBudgets(
              snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
            );
            setTotal( snap.docs.reduce( (x,y) => x + y.data().amount ,0) );
            setLoading(false)
          });  
        
          

    },[date])


    const deleteBudget = (id) => {
    // db code goes here
    setLoading(true)
    const user = auth?.currentUser?.email;
    const expYearMonth = moment(date).format("YYYY-MMM");
    db.collection("budgets").doc(user).collection(expYearMonth).doc("budget").collection("budgets").doc(id)
    .delete().then(() => {
       setLoading(false);
    })

    }

    return (
        <ScrollView style={homeStyles.container}>
            <View style={homeStyles.header}>
                <Text style={homeStyles.headingPage}>Budget</Text>
                <TouchableOpacity onPress={() => navigation.navigate("CreateBudget")}>
                        <Ionicons name="add" size={32} color="black" />
                </TouchableOpacity>
            </View>
      
      {/* choose month */}
      <TouchableOpacity onPress={() => setDatePickerVisibility(true)} style={{...sharedStyles.themeButton,marginHorizontal:10}} >
          <Text style={sharedStyles.themeButtonText}>Choose Month</Text>
      </TouchableOpacity>

      {/* month picker modal */}
      <Modal
        transparent
        animationType="none"
        visible={isDatePickerVisible}
         >
        <TouchableOpacity style={sharedStyles.contentContainer} onPressOut={() => setDatePickerVisibility(false)}>
        <TouchableWithoutFeedback>
            <View style={sharedStyles.content}>
              <MonthPicker
                selectedDate={selectedDate || new Date()}
                onMonthChange={setSelectedDate}
                swipable={true}
              />
              <TouchableOpacity
                style={sharedStyles.confirmButton}
                onPress={handleConfirm}>
                <Text style={sharedStyles.dateButtonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
      
      {/* selected month */}
      <Text style={sharedStyles.selectedDate}>{ moment(date).format('MMM-YYYY') }</Text>        
      
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
                            <View style={styles.budgetRight}>
                                <View>
                                    <Text style={styles.budgetTitle}>{budget.title}</Text>
                                    <Text style={styles.budgetAmount}>Rs. {budget.amount}</Text>
                                </View>
                                <View style={styles.roundContainer}>
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
                                  <TouchableOpacity style={styles.roundContainer} onPress={() => deleteBudget(budget.id)}>
                                        <MaterialCommunityIcons name="delete-outline" size={24} color="#808080" />   
                                  </TouchableOpacity>
                           
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
        padding: 20,
        paddingVertical : 0
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
      budgetRight:{
        flexDirection:'row'
      },
      roundContainer: {
        width: 50,
        height: 50,
        backgroundColor: "#F3F3F4",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 30,
        marginLeft:10
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
      },
 
})
