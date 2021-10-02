import React,{useState,useEffect} from 'react'
import { StyleSheet, Text, View,TouchableOpacity,Dimensions,ActivityIndicator,ScrollView } from 'react-native'
import homeStyles from '../styles/home';
import { Feather } from '@expo/vector-icons';
import { LineChart} from "react-native-chart-kit"; 
import { db,auth } from '../firebase/config';
import moment from "moment";
import  { getMonthDateArray,getMonthTransactionObject } from '../utils/monthDateArray';
import formStyles from '../styles/form';
import sharedStyles from '../styles/shared';
import { AntDesign } from '@expo/vector-icons';
import DateTimePickerModal from "react-native-modal-datetime-picker";

const Stat = () => {
    const [date, setDate] = useState();
    const [transObject,setTransObject] = useState({ income : {},expense : {}});
    const [chartLoading,setChartLoading] = useState(false);
    const [netInMonth,setNetInMonth] = useState({ Income : 0, Expense : 0});
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
      };
    
      const handleConfirm = (date) => {
        setDate(date);
        hideDatePicker();
      };


    // getting the data for chart
    useEffect(() => {
        setChartLoading(true);
        const user = auth?.currentUser?.email;
        const expYearMonth = moment(date).format("YYYY-MMM");
        db.collection("expenses").doc(user).collection(expYearMonth).get().then((snap) => {
           const DateTransArray = snap.docs.map((doc) => ({id : doc.id,...doc.data() }));
           let netIncome = 0;
           let netExpense = 0;
           let initalTransObject = getMonthTransactionObject(...expYearMonth.split("-"));
           // doing shallow copy of the intital transactionObject
           let incomeObject = {...initalTransObject};
           let expenseObject = {...initalTransObject};
           DateTransArray.map( (DateTrans) => {
            netIncome = netIncome + DateTrans.income;
            netExpense = netExpense + DateTrans.expense;
            const dateValue = DateTrans.id.split("-")[0];
            if (getMonthDateArray(...expYearMonth.split("-")).includes(dateValue)) {
                incomeObject[dateValue] = DateTrans.income;
                expenseObject[dateValue] = DateTrans.expense
            }
           }  )

          setTransObject({income : incomeObject,expense : expenseObject})
          setChartLoading(false);
          setNetInMonth({Income : netIncome,Expense : netExpense})
        })
    },[date])


    return (
        <ScrollView style={styles.container}>
            <View style={homeStyles.header}>
                <Text style={homeStyles.headingPage}>Stat</Text>
                <TouchableOpacity>
                    <Feather name="search" size={24} color="black" />
                </TouchableOpacity>
            </View>


            <View>
            {/* chooose date */}
            <TouchableOpacity style={sharedStyles.dateButton}  onPress={() => setDatePickerVisibility(true)} >
                <Text style={sharedStyles.dateButtonText} >Choose Date</Text>
            </TouchableOpacity>

            <View style={styles.netContainer}>
                <Text style={styles.netHeading}>Net Balance</Text>
                <Text style={styles.netAmount}>{netInMonth.Income - netInMonth.Expense }</Text>
                <View style={styles.chartIndicatorContainer}>
                    <View style={styles.chartIndicator}>
                        <View style={styles.expenseLine}></View>
                        <Text style={styles.lineText}>Expense</Text>
                    </View>
                    <View style={styles.chartIndicator}>
                       <View style={styles.incomeLine}></View>
                       <Text style={styles.lineText}>Income</Text> 
                    </View>
                </View>
            </View> 
            {
                chartLoading ?
                <View style={styles.chartPlaceholder}>
                        <ActivityIndicator size="large" color="#FF3378" />
                </View>
                 :
                 <LineChart
                data={{
                labels: Object.keys(transObject.income),
                datasets: [
                    {data: Object.values(transObject.income)},
                    {data : Object.values(transObject.expense),color:(opacity = 1) => `rgba(51, 102, 153, ${opacity})`}
                ]
                }}
                width={Dimensions.get("window").width} // from react-native
                height={300}
                yAxisLabel="Rs."
                withInnerLines={false}
                withOuterLines={false}
                withShadow={false}
                yAxisInterval={1} // optional, defaults to 1
                yLabelsOffset={11}
                xLabelsOffset={11}
                segments={2}
                chartConfig={{
                backgroundColor: "#FFFFFF",
                backgroundGradientFrom: "#FFFFFF",
                backgroundGradientTo: "#FFFFFF",
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 51, 120, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(89,89,89, ${opacity})`,
                propsForLabels : {
                  fontSize : 14
                },
                style: {
                    borderRadius: 16
                },
                propsForDots: {
                    r: "6",
                    strokeWidth: "2",
                    stroke: "#FFFFFF"
                },
                }}
                bezier
                style={{
                margin: 15,
                marginTop:0,
                borderBottomLeftRadius : 20,
                borderBottomRightRadius : 20
                }}
            />
            }
            <View style={formStyles.transboxContainer}>
                <View style={formStyles.transbox}>
                        <AntDesign name="leftcircle" size={34} color="#FF3378" />
                        <View>
                        <Text style={styles.transBoxHead}>Income</Text>
                        <Text style={formStyles.transboxText}>Rs. {netInMonth.Income}</Text>
                        </View>
                </View>
                <View style={formStyles.transbox} >
                        <AntDesign name="rightcircle" size={34} color="rgb(51, 102, 153)" />
                        <View>
                        <Text style={styles.transBoxHead}>Expense</Text>
                        <Text style={formStyles.transboxText}>Rs. {netInMonth.Expense}</Text>
                        </View>
                </View>
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
         

</View>
        </ScrollView>
    )
}

export default Stat

const styles = StyleSheet.create({
    container : {
        backgroundColor : '#F6F6F7',
        flex : 1
    },
    netContainer : {
        backgroundColor : '#FFFFFF',
        margin:15,
        marginBottom : 0,
        padding: 20,
        borderRadius:20,
        borderBottomLeftRadius : 0,
        borderBottomRightRadius : 0,

    },
    netHeading  :{
    fontSize : 18,
     color: '#808080'
    },
    netAmount : {
        color: '#333333',
        fontSize : 28,
        fontWeight : 'bold',
        marginTop:5
    },
    chartIndicatorContainer : {
        flexDirection : 'row'
    },
    chartIndicator : {
        flexDirection : 'row',
        alignItems: 'center',
        marginVertical:20,
        marginRight :30
    },
    expenseLine : {
        height:10,
        width:10,
        borderRadius : 10,
        backgroundColor : '#346699'
    },
    incomeLine : {
        height:10,
        width:10,
        borderRadius : 10,
        backgroundColor : '#FF3378'
    },
    lineText : {
        color:'#808080',
        marginLeft : 5,
        fontSize : 15
    },
    netTransContainer : {
        flexDirection : 'row',
        justifyContent : 'space-around'
    },
    chartPlaceholder : {
        height: 300,
        margin: 15,
        marginTop:0,
        borderBottomLeftRadius : 20,
        borderBottomRightRadius : 20,
        backgroundColor : '#FFFFFF',
        justifyContent : 'center',
        alignItems : 'center'
    },
    transBoxHead : {
        color: '#808080',
        marginBottom : 10,
        fontSize : 14 
    },
    pickerContainer : {
        backgroundColor : '#00000057',
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
        padding:20
    }
})
