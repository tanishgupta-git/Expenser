import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Home from '../screens/home';
import Stat from '../screens/stat';
import Budget from '../screens/budget';
import Profile from '../screens/profile';

const CreatePlaceholder = () => (
  <View style={{ flex: 1, backgroundColor: 'blue' }} />
);

const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({children, onPress}) => (
   <TouchableOpacity style={{
     top : -15,
     justifyContent : 'center',
     alignItems : 'center',
   }} 
   onPress={onPress}>
       <View style={{
     width: 60,
     height: 60,
     borderRadius:30,
     ...styles.shadow
       }}>
         { children }
       </View>
   </TouchableOpacity>
)

export default function HomeStack() {
  return (
      <Tab.Navigator
      screenOptions={() => ({
          tabBarShowLabel : false,
          tabBarStyle : {
              height: 70,
              backgroundColor :'#ffffff',
              position: 'relative'
          }
        })}  
         >

           {/*  home screen */}
            <Tab.Screen name="Home" options={{headerShown:false ,
             tabBarIcon : ({focused}) => (
               <View style={styles.tabItemContainer}>
                    <Ionicons name='calendar-sharp' size={24} color={focused ? '#FF3378' : '#afb3b6'} />
                    <Text style={ focused ? styles.focusedText : styles.unfocusedText }>Home</Text>
               </View>
             )}
             } component={Home} 

             />

           {/* stat screen */}
            <Tab.Screen name="Stat" options={{headerShown:false,             
            tabBarIcon : ({focused}) => (
               <View style={styles.tabItemContainer}>
                    <Ionicons name='stats-chart' size={24} color={focused ? '#FF3378' : '#afb3b6'} />
                    <Text style={ focused ? styles.focusedText : styles.unfocusedText }>Stat</Text>
               </View>
             )}} component={Stat} />

           {/* addtransaction screen */}
            <Tab.Screen name="Add" 
            options={{
            headerShown:false,             
            tabBarIcon : () => (
                  <Ionicons name="md-add" size={35} color="#ffffff" />
             ),
             tabBarButton: (props) => (
               <CustomTabBarButton  {...props}/>
             )
             }} 
             listeners={({navigation}) => ({
               tabPress : (e) => {
                 e.preventDefault();
                 navigation.navigate('AddTransaction')
               }
             })}
             component={CreatePlaceholder} />
     
            {/* budget screen */}
            <Tab.Screen name="Budget" options={{headerShown:false,             
            tabBarIcon : ({focused}) => (
               <View style={styles.tabItemContainer}>
                    <Ionicons name='card' size={24} color={focused ? '#FF3378' : '#afb3b6'} />
                    <Text style={ focused ? styles.focusedText : styles.unfocusedText }>Budget</Text>
               </View>
             )}} component={Budget} />

            {/* profile screen */}
            <Tab.Screen name="Profile" options={{headerShown:false,             
            tabBarIcon : ({focused}) => (
               <View style={styles.tabItemContainer}>
                    <Ionicons name='person-circle' size={24} color={focused ? '#FF3378' : '#afb3b6'} />
                    <Text style={ focused ? styles.focusedText : styles.unfocusedText }>Profile</Text>
               </View>
             )}} component={Profile} />


      </Tab.Navigator>

  );
}


const styles = StyleSheet.create({
  tabItemContainer : {
    alignItems : 'center',
    justifyContent:'center'
  },
  shadow : {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 10},
    shadowRadius: 10,
    elevation: 20,
    backgroundColor: '#FF3378'
  },

  focusedText : {
     color: '#000000'
  },
  unfocusedText : {
    color : '#afb3b6'
  }
})