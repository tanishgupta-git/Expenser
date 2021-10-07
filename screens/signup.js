import React,{useState,useEffect} from 'react'
import { Keyboard, Text, TextInput, TouchableWithoutFeedback, View,TouchableOpacity,StatusBar,Alert } from 'react-native'
import DashSvg from '../components/dashSvg'
import { AntDesign } from '@expo/vector-icons';
import styles from '../styles/auth';
import { auth } from '../firebase/config';

const Signup = ({navigation}) => {
    const [iconDim, setIcondim] = useState({width:250,height:200});
    const [username,Setusername] = useState();
    const [email,Setemail] = useState();
    const [password,Setpassword] = useState();
    
    const handleSubmit = () => {
      if(!username && !email && !password) {
          Alert.alert("All fields are required");
          return;
      }
      auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
         userCredential.user.updateProfile({ displayName: username })
      })
      .catch((error) => {
        Alert.alert("Try with different email or try again later.");
      });
    }


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
                        <TextInput style={styles.formInput}
                         placeholder="John Doe" 
                         placeholderTextColor="#caccce"
                         onChangeText={(value) => Setusername(value)}
                         value={username} 

                         />
                    </View>
                    <View style={styles.formInputContainer}>
                        <Text style={styles.formInputLabel}>Email</Text>
                        <TextInput style={styles.formInput} 
                                placeholder="name@domain.com" 
                               placeholderTextColor="#caccce" 
                               onChangeText={(value) => Setemail(value)}
                               value={email} 
                               />
                    </View>
                    <View style={styles.formPasswordContainer}>
                        <View style={styles.formPasswordInput}>
                            <Text style={styles.formInputLabel} >Password</Text>
                            <TextInput style={styles.formInput} 
                            placeholder="**********" 
                            placeholderTextColor="#caccce"
                            onChangeText={(value) => Setpassword(value)}
                            value={password} 
                            secureTextEntry
                             />
                        </View>
                        <TouchableOpacity onPress={handleSubmit} style={styles.formsubmitButton}>
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
