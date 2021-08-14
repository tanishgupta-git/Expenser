import React,{useState,useRef} from 'react'
import { StatusBar, StyleSheet, Text, TouchableOpacity, View,TextInput,Keyboard,TouchableWithoutFeedback,Image,ActivityIndicator } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import TransSvg from '../components/transSvg';
import SharedStyles from '../styles/shared';

const AddTransaction = ({navigation}) => {
    const [typeTrans,setTypeTrans] = useState();
    const [transTitle,setTransTitle] = useState();
    const [thirdQuestion,setThirdQuestion] = useState(false);
    const [category,setCategory] = useState();
    const [amount,setAmount] = useState();
    const [loading,setLoading] = useState(false);

    const AnimationRef = useRef(null);
    const _onPress = async (typeTrans) => {
        if(AnimationRef) {
          await AnimationRef.current?.fadeOutUp();
          setTypeTrans(typeTrans);
        }
      }

   const submitCategory = (category) => {
       setCategory(category);
   }

   const submitHandler = () => {
    Keyboard.dismiss();   
    setLoading(true);
    navigation.replace('TransDetail');
   }

    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        
        <View style={styles.container}>

           {
            loading && 
            <View style={SharedStyles.loadingContainer}> 
                    <ActivityIndicator size="large" color='#FF3378' />
                </View>

             }
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
                  typeTrans 
                   && 
                <View style={{flex:1,justifyContent:'space-between'}}>

                  <View style={styles.transDetails}>
                      <View style={styles.transDetail}>
                            <AntDesign  name={typeTrans === 'Expense' ? 'rightcircle' : 'leftcircle'} size={50} color={typeTrans === 'Expense' ? '#FF3378' : '#33C9FF'} />
                            <View style={styles.transTextContainer} >
                                <Text style={styles.transTextHead}>Transaction Type</Text>
                                <Text style={styles.transText}>{typeTrans}</Text>
                            </View>
                      </View>
                      {
                          thirdQuestion && 
                          <View style={styles.transDetail}>
                          { category ? ( category=== 'Cash' ?                                
                          <View style={styles.transCatimageContainer}>
                                    <Image style={styles.transCatimage} source={require("../assets/cash.png")}/>
                                </View> 
                                :
                                <View style={styles.transCatimageContainer}>
                                    <Image style={styles.transCatimage} source={require("../assets/bank.png")} />
                                </View>
                                 ) 
                                :
                                <View style={styles.transCatimagePlaceholder}></View>
                                }
                          <View style={styles.transTextContainer} >
                                <Text style={styles.transTextHead}>Payee Name</Text>
                                <Text style={styles.transText}>{transTitle}</Text>
                            </View>
                          </View>
                      }
                  </View>  

                { !thirdQuestion 
                     &&       
                  <View style={styles.inputFormContainer}>
                                <View style={styles.textInputContainer}>
                                    <Text style={styles.textInputLabel} >Payee Name</Text>
                                    <TextInput style={styles.textInput} 
                                            placeholder="Enter Payee Name" 
                                            placeholderTextColor="#DFE0E3"
                                            onChangeText={(value) => setTransTitle(value)}
                                            value={transTitle} 
                                            autoFocus

                                            />
                                </View>
                                <TouchableOpacity onPress={() => setThirdQuestion(true)} style={transTitle ? styles.formsubmitButton : {...styles.formsubmitButton ,backgroundColor:'#CFD4E6'}} disabled={!transTitle}>
                                    <Text><AntDesign name="right" size={20} color="#ffffff" /></Text>
                                </TouchableOpacity>
                 </View>
                }
           {/* third question  */}
            { (thirdQuestion && !category ) && 
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
        }

        {/* fourth question */}
        { (thirdQuestion && category) &&
            <View style={styles.inputFormContainer}>
                                <View style={styles.textInputContainer}>
                                    <Text style={styles.textInputLabel} >Enter Amount</Text>
                                    <TextInput style={styles.textInput} 
                                            placeholder="Amount in Rs." 
                                            placeholderTextColor="#DFE0E3"
                                            onChangeText={(value) => setAmount(value)}
                                            value={amount}
                                            keyboardType='numeric' 
                                            autoFocus
                                            />
                                </View>
                                <TouchableOpacity onPress={submitHandler} style={amount ? {...styles.formsubmitButton,width:100} : {...styles.formsubmitButton ,backgroundColor:'#CFD4E6',width:100}} disabled={!amount}>
                                    <Text style={styles.amountButtontext}>Finish</Text>
                                </TouchableOpacity>
        </View>
        }




                </View>
               }
              

            </View>
       </View>
    </TouchableWithoutFeedback>
    )
}

export default AddTransaction

const styles = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor : '#ffffff'
    },
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
       width:260
   },
   formQuestions : {
       padding: 30,
       flex:1
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
   },
   transDetails : {
     justifyContent : 'space-between'
   },
   transTextContainer : {
       justifyContent : 'space-between',
       marginLeft : 20
   },
   transDetail : {
       flexDirection : 'row',   
       alignItems:'center',
       marginBottom : 30
   },
   transTextHead : {
       color: '#bfbfbf',
       fontWeight : 'bold',
       marginBottom : 5
   },
   transText : {
       fontWeight : 'bold',
       fontSize : 22
   },
   inputFormContainer : {
       flexDirection : 'row',
       alignItems:'center'
   },
   textInputContainer : {
       flex: 1
   },
   textInput : {
    paddingVertical:5,
    fontSize : 22,
    fontWeight : 'bold',
    borderBottomWidth : 2,
    color: '#000000',
    borderColor: '#DFE0E3'
   },
   textInputLabel :{
    color: '#bfbfbf',
    fontWeight : 'bold',
    marginBottom : 5       
   },
   formsubmitButton : {
    backgroundColor:'#FF3378',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:15,
    marginHorizontal:5,
    width: 50,
    height: 50
   },
   transCatimageContainer : {
       width: 50,
       height:50,
       backgroundColor :'#cccccc',
       justifyContent : 'center',
       alignItems : 'center',
       borderRadius:30
       
   },
   transCatimage : {
       width: 30,
       height: 30
   },
   transCatimagePlaceholder:{
    width: 50,
    height:50,
    backgroundColor :'#EFEFF0',
    justifyContent : 'center',
    alignItems : 'center',
    borderRadius:25,
    borderWidth : 2,
    borderColor : '#cccccc',
    borderStyle:'dashed'
   },
   amountButtontext : {
       color:'#ffffff',
       fontSize:19,
       fontWeight:'bold' 
    }
})
