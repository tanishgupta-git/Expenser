import React,{useState,useEffect} from 'react'
import { Keyboard,Text, TextInput, TouchableWithoutFeedback, View,TouchableOpacity,StatusBar,Alert } from 'react-native'
import DashSvg from '../components/dashSvg'
import { AntDesign } from '@expo/vector-icons';
import { auth } from '../firebase/config';
import styles from '../styles/auth';

const Login = ({navigation}) => {
    const [iconDim, setIcondim] = useState({width:250,height:200});
    const [email,Setemail] = useState();
    const [password,Setpassword] = useState();

    const handleSubmit = () => {
      if(!email || !password ) {
          Alert.alert("Enter email and password");
          return;
      }
      auth.signInWithEmailAndPassword(email, password)
      .catch((error) => {
        Alert.alert("email or password is incorrect");
      });

   }

       // adding a listener for user authentication state
       useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(userAuth => {
            if (userAuth) {
                navigation.replace('HomePage');
            }
        })
        
        return unsubscribe;
    },[])



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
               <TouchableOpacity onPress={ () => navigation.navigate("Signup")}><Text style={styles.linkPage}>Sign Up</Text></TouchableOpacity>               
           </View>

           <View style={styles.formContainer}>
                <View style={styles.dashSvgContainer}>
                        <DashSvg iconDim={iconDim}/>
                </View>
                <Text style={styles.textHeading}>Login to your account</Text>
                <View>
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
                                     onSubmitEditing={handleSubmit} 

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

export default Login