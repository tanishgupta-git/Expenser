
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeStack from './home';
import AddTransaction from '../screens/addTransaction';

const Stack = createNativeStackNavigator();

const MainStack = () => {
    return (
        <Stack.Navigator >
                <Stack.Group>
                    <Stack.Screen name="HomeStack"  options={{headerShown:false}} component={HomeStack} />
                </Stack.Group>
                <Stack.Group screenOptions={{ presentation: 'modal' }} >
                    <Stack.Screen name="AddTransaction"  options={{headerShown:false}} component={AddTransaction}/>
                </Stack.Group>
        </Stack.Navigator>

    )
}

export default MainStack;