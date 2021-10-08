import React from 'react'
import { StyleSheet, Text, View,Image,TouchableOpacity } from 'react-native'

const Transaction = ({transaction,id,onClickTransaction}) => {


    return (
        <TouchableOpacity style={styles.transaction} onPress={() => onClickTransaction(id)}>
            <View style={styles.transactionSubcontainer}>
                    <View style={styles.transimageContainer}>
                    {transaction.category === "Bank" ? (
                        <Image
                        style={styles.transimage}
                        source={require("../assets/bank.png")}
                        />
                    ) : (
                        <Image
                        style={styles.transimage}
                        source={require("../assets/cash.png")}
                        />
                    )}
                    </View>
                    <Text style={styles.transactionTitle}>{transaction.title}</Text>
            </View>
                <Text style={ transaction.type === 'Income' ? styles.transactionIncome : styles.transactionExpense}>Rs. {transaction.amount}</Text>
      </TouchableOpacity>
    )


}

export default Transaction

const styles = StyleSheet.create({   
      transaction: {
        flexDirection: "row",
        alignItems:'center',
        justifyContent:'space-between',
        paddingVertical:15,
        marginHorizontal:15,
        borderBottomWidth:1,
        borderTopWidth : 1,
        borderTopColor : '#F1F1F1',
        borderBottomColor : '#F1F1F1'
      },
      transimage: {
        width: 30,
        height: 30,
      },
      transactionSubcontainer : {
        flexDirection : 'row',
        alignItems : 'center',
        maxWidth:250
      },
      transimageContainer: {
        width: 50,
        height: 50,
        backgroundColor: "#F3F3F4",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 30,
      },
      transactionTitle : {
          marginLeft :10,
          fontWeight:'bold',
          fontSize:18,
          color:'#333742'
      },
      transactionIncome : {
          fontSize:18,
          color: '#17e821',
          fontWeight : 'bold'
      },
      transactionExpense : {
          fontSize : 18,
          color: '#ff0000',
          fontWeight : 'bold'
      }
})
