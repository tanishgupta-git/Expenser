import React,{useState,useRef} from 'react'
import { StatusBar, StyleSheet, Text, TouchableOpacity, View,TextInput } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import TransSvg from '../components/transSvg';


const AddTransaction = ({navigation}) => {
    const [typeTrans,setTypeTrans] = useState();
    const [transTitle,setTransTitle] = useState();

    const AnimationRef = useRef(null);
    const _onPress = async (typeTrans) => {
        if(AnimationRef) {
          await AnimationRef.current?.fadeOutLeft();
          setTypeTrans(typeTrans)
        }
      }
    return (
        <View style={{backgroundColor:'#FCFCFC',flex:1}}>

            <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Entypo name="cross" size={30} color="black" />
                    </TouchableOpacity>
                <Text style={styles.headingPage}>Add transaction</Text>
            </View>
            <View style={styles.formQuestions}>

            {/* first question */}
               {!typeTrans && 
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
               }
               {/* second question */}
               {
                   typeTrans && 
                   <View>

                  <View style={styles.transDetails}>
                      <View>
                            <AntDesign  name={typeTrans === 'Expense' ? 'rightcircle' : 'leftcircle'} size={34} color={typeTrans === 'Expense' ? '#FF3378' : '#33C9FF'} />
                            <View>
                                <Text>Transaction Type</Text>
                                <Text>{typeTrans}</Text>
                            </View>
                      </View>
                  </View>       
                  <View style={styles.formPasswordContainer}>
                                <View style={styles.formPasswordInput}>
                                    <Text style={styles.formInputLabel} >Payee Name</Text>
                                    <TextInput style={styles.formInput} 
                                            placeholder="Enter Payee Name" 
                                            placeholderTextColor="#caccce"
                                            onChangeText={(value) => setTransTitle(value)}
                                            value={transTitle} 
                                            secureTextEntry

                                            />
                                </View>
                                <TouchableOpacity  style={styles.formsubmitButton}>
                                    <Text><AntDesign name="right" size={20} color="#ffffff" /></Text>
                                </TouchableOpacity>
                            </View>
                    </View>
               }
                
            </View>
       </View>
    )
}

export default AddTransaction

const styles = StyleSheet.create({
    header: {
     flexDirection:'row',
     alignItems:'center',
     padding:10,
     paddingLeft:20,
     backgroundColor:'#ffffff',
     borderBottomRightRadius:20,
     borderBottomLeftRadius:20
    },
    headingPage:{
       fontSize:25,
       marginLeft:15,
       fontWeight:'bold'
    },
   svgContainer : {
       alignItems : 'center',
       marginBottom:20
   },
   questionHead : {
       fontSize:25,
       fontWeight : 'bold',
       width: 200
   },
   formQuestions : {
       padding: 30
   },
   transboxContainer:{ 
       flexDirection : 'row',
       justifyContent:'space-around',
       paddingVertical:30
   },
   transbox : {
       width: 150,
       height: 180,
       backgroundColor:'#ffffff',
       borderRadius:20,
       elevation:2,
       padding: 20,
       justifyContent:'space-between'
   },
   transboxText:{
       fontSize:20,
       fontWeight:'bold'
   }
})
