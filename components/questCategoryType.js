import React from 'react'
import {Text, View, TouchableOpacity,Image } from 'react-native'
import styles from '../styles/form';

const QuestCategoryType = ({submitCategory}) => {
    return (
        <View>
                <Text style={styles.questionHead}>Choose The Category</Text>
                <View style={styles.transboxContainer}>
                    <TouchableOpacity style={styles.transbox} onPress={() => submitCategory("Bank")}>
                            <View style={styles.transCatimageContainer}>
                                <Image style={styles.transCatimage} source={require("../assets/bank.png")} />
                            </View>
                            <Text style={styles.transboxText}>Bank</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.transbox} onPress={() => submitCategory("Cash")}>
                            <View style={styles.transCatimageContainer}>
                                <Image style={styles.transCatimage} source={require("../assets/cash.png")}/>
                            </View>
                            <Text style={styles.transboxText}>Cash</Text>
                    </TouchableOpacity>
                </View>
        </View>
    )
}

export default QuestCategoryType;