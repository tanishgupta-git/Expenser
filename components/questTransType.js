import React,{useRef} from 'react';
import {Text, View ,TouchableOpacity} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import TransSvg from '../components/transSvg';
import styles from '../styles/form';

const QuestTransType = ({setTypeTrans}) => {
    const AnimationRef = useRef(null);
    const _onPress = async (typeTrans) => {
        if(AnimationRef) {
          await AnimationRef.current?.fadeOutUp();
          setTypeTrans(typeTrans);
        }
      }

    return (
        <Animatable.View ref={AnimationRef} duration={500}>
            <View style={styles.svgContainer}>
                    <TransSvg  />
            </View>
            <Text style={styles.questionHead}>What kind of transaction it is ?</Text>
            <View style={styles.transboxContainer}>
                <TouchableOpacity style={styles.transbox} onPress={() => _onPress("Income")} >
                        <AntDesign name="leftcircle" size={34} color="#33C9FF" />
                        <Text style={styles.transboxText}>Income</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.transbox}  onPress={() => _onPress("Expense")}>
                        <AntDesign name="rightcircle" size={34} color="#FF3378" />
                        <Text style={styles.transboxText}>Expense</Text>
                </TouchableOpacity>
            </View>
      </Animatable.View>
    )
}

export default QuestTransType
