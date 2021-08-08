import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import Home from '../screens/home';
import Stat from '../screens/stat';
import Budget from '../screens/budget';
import Profile from '../screens/profile';

const Tab = createBottomTabNavigator();

export default function HomeStack() {
  return (
      <Tab.Navigator
      screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'calendar-sharp'
            } else if (route.name === 'Stat') {
              iconName = 'stats-chart';
            } else if (route.name === 'Budget') {
              iconName = 'card';
            } else if (route.name === 'Profile') {
              iconName = 'person-circle';
            }
            color = focused ? '#FF3378' : '#caccce';

 
            return <Ionicons name={iconName} size={size} color={color} />;

          },
          tabBarActiveTintColor: '#FF3378',
          tabBarInactiveTintColor: '#caccce',
          tabBarLabelStyle : {
              fontSize : 15
          },
          tabBarStyle : {
              padding: 10,
              height: 70,
              backgroundColor : '#ffffff'
          }
        })}
        
         >
    
            <Tab.Screen name="Home" options={{headerShown:false}} component={Home} />
            <Tab.Screen name="Stat" options={{headerShown:false}} component={Stat} />
            <Tab.Screen name="Budget" options={{headerShown:false}} component={Budget} />
            <Tab.Screen name="Profile" options={{headerShown:false}} component={Profile} />
      </Tab.Navigator>

  );
}