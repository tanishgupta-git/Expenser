import React from 'react'
import { Keyboard, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View,TouchableOpacity,StatusBar } from 'react-native'
import LoginSvg from '../components/loginSvg'
import { AntDesign } from '@expo/vector-icons';


const Login = () => {
    return (
      <TouchableWithoutFeedback onPress={ () => Keyboard.dismiss()}>
        <View style={styles.container}>
          <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
           <View style={styles.logHeader}>
               <Text style={styles.name}>Expenser</Text>
               <TouchableOpacity><Text style={styles.linkPage}>Sign Up</Text></TouchableOpacity>               
           </View>
           <LoginSvg />
           <View style={styles.formContainer}>
             
                <Text style={styles.textHeading}>Login to your account</Text>
                <View>
                    <View style={styles.formInputContainer}>
                        <Text style={styles.formInputLabel}>Email</Text>
                        <TextInput style={styles.formInput} placeholder="name@domain.com" placeholderTextColor="#bdbfc2" />
                    </View>
                    <View style={styles.formPasswordContainer}>
                        <View style={styles.formPasswordInput}>
                            <Text style={styles.formInputLabel} >Password</Text>
                            <TextInput style={styles.formInput} placeholder="**********" placeholderTextColor="#bdbfc2" />
                        </View>
                        <TouchableOpacity style={styles.formsubmitButton}>
                            <Text><AntDesign name="right" size={20} color="#ffffff" /></Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

        </View>
    </TouchableWithoutFeedback>
    )
}

export default Login

const styles = StyleSheet.create({
    container :{
        flex: 1,
        backgroundColor : '#fcfcfc'
    },
    logHeader : {
        flexDirection : 'row',
        justifyContent :'space-between',
        alignItems :'center',
        padding:20,
        borderColor:'#ffffff',
        borderWidth:1,
        borderStyle :'solid',
        borderBottomLeftRadius:30,
        borderBottomRightRadius:30,
        backgroundColor:'#ffffff'
    },
    name : {
        color: '#6A6D76',
        fontSize : 22,
        fontWeight : '900'
    },
    linkPage : {
        fontSize : 15,
        color : '#42224A'
    },
    formContainer : {
        flex:1,
        padding: 20
    },
    formInputContainer:{
      marginVertical:20
    },
    formPasswordContainer:{
        marginVertical:20,
        flexDirection:'row',
        alignItems:'center',
    
    }, 
    formPasswordInput :{
        flex: 1,
        marginRight:20
    },
    formInput : {
        padding: 10,
        paddingLeft:0,
        borderBottomWidth:2,
        borderColor:'#E3E4E5',
        fontSize:20,
        fontWeight:'bold'

    },
    textHeading : {
        fontSize :25,
        marginBottom:10,
        fontWeight:'bold',
        color: '#000000',

    },
    formsubmitButton : {
        backgroundColor:'#42224A',
        padding: 12,
        borderRadius:15,
        marginHorizontal:5
    },
    formInputLabel : {
        color: '#bdbfc2',
        fontWeight:'bold'
    }
})
