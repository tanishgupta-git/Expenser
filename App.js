import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Login from './screens/login';
import Signup from './screens/signup';
import HomeStack from './routes/home';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
      // starting of the app
      <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Login" options={{headerShown: false}} component={Login} />
            <Stack.Screen name="Signup" options={{headerShown: false}} component={Signup} />
            <Stack.Screen name="HomePage"  options={{headerShown:false}} component={HomeStack} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}
