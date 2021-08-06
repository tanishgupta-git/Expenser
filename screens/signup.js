import React,{useState,useEffect} from 'react'
import { Keyboard, Text, TextInput, TouchableWithoutFeedback, View,TouchableOpacity,StatusBar } from 'react-native'
import DashSvg from '../components/dashSvg'
import { AntDesign } from '@expo/vector-icons';
import styles from '../styles/auth';

const Signup = ({navigation}) => {
    const [iconDim, setIcondim] = useState({width:250,height:200});

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
          'keyboardDidShow',
          () => {
            setIcondim({width:0,height:0}); // or some other action
          }
        );
        const keyboardDidHideListener = Keyboard.addListener(
          'keyboardDidHide',
          () => {
            setIcondim({width:250,height:200}); // or some other action
          }
        );
    
        return () => {
          keyboardDidHideListener.remove();
          keyboardDidShowListener.remove();
        };
      }, []);

    return (
      <TouchableWithoutFeedback onPress={ () => Keyboard.dismiss()}>
        <View style={styles.container}>
          <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

           <View style={styles.logHeader}>
               <Text style={styles.name}>Expenser</Text>
               <TouchableOpacity onPress={ () => navigation.navigate("Login")}><Text style={styles.linkPage}>Log In</Text></TouchableOpacity>               
           </View>

           <View style={styles.formContainer}>

                <View style={styles.dashSvgContainer}>
                        <DashSvg iconDim={iconDim}/>
                </View>

                <Text style={styles.textHeading}>Signup to your account</Text>
                <View>
                    <View style={styles.formInputContainer}>
                        <Text style={styles.formInputLabel}>Your Name</Text>
                        <TextInput style={styles.formInput} placeholder="John Doe" placeholderTextColor="#caccce" />
                    </View>
                    <View style={styles.formInputContainer}>
                        <Text style={styles.formInputLabel}>Email</Text>
                        <TextInput style={styles.formInput} placeholder="name@domain.com" placeholderTextColor="#caccce" />
                    </View>
                    <View style={styles.formPasswordContainer}>
                        <View style={styles.formPasswordInput}>
                            <Text style={styles.formInputLabel} >Password</Text>
                            <TextInput style={styles.formInput} placeholder="**********" placeholderTextColor="#caccce" />
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

export default Signup;
