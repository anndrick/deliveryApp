import { View, Text, SafeAreaView } from 'react-native'
import React, {useEffect} from 'react'
import * as Animatable from 'react-native-animatable'
import * as Progress from 'react-native-progress'
import { useNavigation } from '@react-navigation/native'


export default function PreparingOrderScreen() {

    const navigation = useNavigation();
    useEffect(()=> {
        setTimeout(() =>{
            navigation.navigate('Delivery')
        }, 3000);
    },[])
  return (
    <SafeAreaView className='flex-1 justify-center items-center bg-gray-900'>
        <Animatable.Image
            source={require('../assets/3hm5mg.gif')}
            animation= 'slideInUp'
            iterationCount={1}
            className='h-96 w-96'    
        />
        <Animatable.Text
            animation='slideInUp'
            iterationCount={1}
            className='text-lg my-10 text-black font-bold text-center'
        > Waiting for Restaurant To Receive Your Order</Animatable.Text>
        <Progress.Circle size={60} indeterminate={true} color='#00CCBB'/>
    </SafeAreaView>
  )
}