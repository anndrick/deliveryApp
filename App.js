import React from 'react';
import { TailwindProvider } from 'tailwindcss-react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './pages/Home';
import RestaurantScreen from './pages/RestaurantScreen';
import BasketScreen from './pages/BasketScreen';
import PreparingOrderScreen from './pages/PreparingOrderScreen'
import DeliveryScreen from './pages/DeliveryScreen'
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './store'



StatusBar.setBarStyle('dark-content', true);

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <TailwindProvider>
          <Stack.Navigator>
            <Stack.Screen name='Home' component={Home} />
            <Stack.Screen name='Restaurant' component={RestaurantScreen} />
            <Stack.Screen name='Basket' component={BasketScreen} options={{presentation: 'modal', headerShown: false}}/>
            <Stack.Screen name='PreparingOrderScreen' component={PreparingOrderScreen} options={{presentation: 'modal', headerShown: false}}/>
            <Stack.Screen name='Delivery' component={DeliveryScreen} options={{presentation: 'modal', headerShown: false}}/>
           </Stack.Navigator>
        </TailwindProvider>
      </Provider>
    </NavigationContainer>
  );
}
