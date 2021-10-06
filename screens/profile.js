import React,{useState,useEffect} from 'react'
import { StyleSheet, Text, View,TouchableOpacity,ActivityIndicator,Platform, Image, ScrollView } from 'react-native'
import homeStyles from '../styles/home';
import { auth,db,storage } from '../firebase/config';
import * as ImagePicker from "expo-image-picker";
import 'react-native-get-random-values';
import { v4 as uuidv4} from 'uuid'; 
import { Feather } from '@expo/vector-icons';
import SharedStyles from '../styles/shared';

const Profile = ({navigation}) => {
    const [image,setImage] = useState(null);
    const [imageLoading,setImageLoading] = useState(false);
    const [prevImageuuid,setPrevImageuuid] = useState(null);
    const [imageUploading,setImageUploading] = useState(false);
    
    // checking the permission
    useEffect(() => {
        async function checkPermission() {
        if (Platform.OS !== "web") {
            const {
              status,
            } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== "granted") {
              alert("Sorry, Expenser need camera roll permissions to make this work!");
            }
          }
        }
        checkPermission();
    },[])
    
    // loading the intial data
    useEffect(() => {
      setImageLoading(true);
      db.collection("usersimage").doc(auth?.currentUser.email).get().then( (doc) => {
   
          if(!!doc.data()) {
            setImage(doc.data().url);
            setPrevImageuuid(doc.data().uuid)
          }
         setImageLoading(false);
      })
    },[])
    // funcition for logout
    const handleClick = async () => {
        await auth.signOut();
        navigation.navigate('Login');
    }

    // function for handling the picked image
      const  _handleImagePicked = async (pickerResult) => {
        try {
          setImageUploading(true)
          if (!pickerResult.cancelled) {
           
            const { uploadUrl,uuid } = await uploadImageAsync(pickerResult.uri);
            await db.collection("usersimage").doc(auth?.currentUser.email).set({
              url : uploadUrl,
              uuid : uuid
            })

            // deleting the prev image by using the prev uid 
            if (prevImageuuid) {
              const imageRef = storage.ref().child(prevImageuuid);
              await imageRef.delete();
            }
            // reseting the uid with new image 
            setPrevImageuuid(uuid);
            setImage(uploadUrl)
            setImageUploading(false);
          }
        } catch (e) {
          console.log(e);
          alert("Upload failed, sorry :(");
        } finally {
          setImageUploading(false);
        }
      };

     // function for capturing image
      const _takePhoto = async () => {
        let pickerResult = await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          aspect: [4, 3],
        });
        _handleImagePicked(pickerResult);
      };
    
     // function for picking image from storage
     const  _pickImage = async () => {
        let pickerResult = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          aspect: [4, 3],
        });
    
        console.log({ pickerResult });
    
        _handleImagePicked(pickerResult);
      };
    
   // function for uploading image asynchronus using xmlHttp 
    const uploadImageAsync = async (uri) => {

      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function (e) {
          console.log(e);
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", uri, true);
        xhr.send(null);
      });
      const generateUUID = uuidv4();
      const ref = storage.ref().child(generateUUID);
      const snapshot = await ref.put(blob);
      blob.close();
   
      const getUrl = await snapshot.ref.getDownloadURL();
      return { uploadUrl : getUrl,uuid:generateUUID}
    }


    return (
        <ScrollView style={homeStyles.container}>
            <View style={homeStyles.header}>
                <Text style={homeStyles.headingPage}>Profile</Text>
            </View>

            {
              imageUploading && 
              <View style={SharedStyles.loadingContainer}>
                <Text style={SharedStyles.uploadingText}>Uploading ...</Text>
                <ActivityIndicator size="large" color="#FF3378" />
              </View>
            }

            <View style={styles.profileContainer}>
  
                {/* image container */}
                <View style={styles.imageContainer}>
                    {
                        image ? 
                        <View>
                        
                         <Image source={{ uri: image }} style={{ width: 200, height: 200,borderRadius:140 }} />
                        </View> 
                        :
                        <View style={styles.imagePlaceholder}>
                          {
                            imageLoading 
                               ?
                              <ActivityIndicator size="large" color="#FF3378" />
                               :
                               <Text>No Image Found</Text>
                          }
                            
                        </View>
                    }
                </View>

                {/* image picker buttoncontainer */}
                <View style={styles.buttonContainer}>

                    <TouchableOpacity style={styles.photoButton} onPress={_pickImage} >
                        <Text style={styles.buttonText}><Feather name="upload-cloud" size={24} color='#474B56' /> Choose Photo</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.photoButton} onPress={_takePhoto}>
                      <Text style={styles.buttonText}><Feather name="camera" size={24} color='#474B56' /> Take Photo</Text>
                    </TouchableOpacity>

                </View>

                <View style={styles.profileInfo}>
                    <Text style={styles.profileLabel}>Username</Text>
                    <Text style={styles.profileText}>{auth?.currentUser.displayName}</Text>
                </View>

                <View style={styles.profileInfo}>
                    <Text style={styles.profileLabel}>Email</Text>
                    <Text style={styles.profileText}>{auth?.currentUser.email}</Text>
                </View>
                <TouchableOpacity style={styles.logoutButton} onPress={handleClick}><Text style={styles.logoutbuttonText} >Logout</Text></TouchableOpacity>
            
            </View>
        </ScrollView>
    )
}

export default Profile

const styles = StyleSheet.create({
    profileContainer : {
        padding: 25
    },
    buttonContainer : {
      flexDirection : 'row',
      justifyContent : 'space-between'
    },
    photoButton : {
      backgroundColor :  '#F3F3F4',
      padding: 15,
      justifyContent : 'center',
      alignItems : 'center',
      borderRadius : 5,
      marginTop :20
    },
    imageContainer : {
        justifyContent : 'center',
        alignItems : 'center',
        marginBottom : 10 
    },
    imagePlaceholder : {
        backgroundColor : '#F3F3F4',
        width:200,
        height: 200,
        borderRadius : 140,
        justifyContent:'center',
        alignItems : 'center'
    },
    profileInfo : {
        marginVertical:10
    },
    profileLabel : {
        fontSize:16,
        color : '#888991',
    },
    profileText : {
        fontWeight : 'bold',
        fontSize : 20,
        color: '#474B56',
        marginVertical:10
    },
    logoutButton : {
        backgroundColor : '#FF3378',
        padding: 10,
        justifyContent : 'center',
        alignItems : 'center',
        borderRadius : 5,
        marginTop : 20

    },
    logoutbuttonText : {
        color: '#ffffff',
        fontSize:17
    },
    buttonText : {
      color : '#474B56',
      fontSize : 17
    }
})