import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Login from './screens/login';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      // starting of the app
      <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Login" options={{headerShown: false}} component={Login} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}
