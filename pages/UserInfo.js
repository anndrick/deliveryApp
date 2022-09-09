import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { ArrowLeftIcon } from 'react-native-heroicons/solid'
import { useNavigation, useRoute } from '@react-navigation/native'


export default function UserInfo() {
    const navigation = useNavigation();
    return (
        <View className='py-4 px-5 mt-5 bg-gray-900 h-full'>
            <TouchableOpacity className='absolute top-14 left-5 p-2 bg-gray-100 rounded-full'  onPress={navigation.goBack}>
                <ArrowLeftIcon size={20} color={'#00CCBB'}/>
            </TouchableOpacity>
            <View className='items-center '>
                <Image
                    source={
                        require('../assets/20220811_135211.jpg')
                    }
                    className='mt-2 rounded-xl '
                    style={{ width: 200, height: 200}}
                />
                <View className='text-center'>
                    <Text className='mt-5 text-xl text-center text-white'>Nombre: Jose Alfredo Jiménez</Text>
                    <Text className='mt-5 text-xl text-center text-white'>Dirección: Tecnológico de Monterrey, Campus Ciudad de México </Text>
                    <Text className='mt-5 text-xl text-center text-white'>Teléfono: 5551234567</Text>
                    <Text className='mt-5 text-xl text-center text-white'>Correo: holaxd@domain.com</Text>
                </View>
            </View>
        </View>
    )
}