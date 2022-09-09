import { useNavigation } from '@react-navigation/native'
import React from 'react'
import {View, Text, TouchableOpacity, Image } from 'react-native'
import { LocationMarkerIcon, StarIcon } from 'react-native-heroicons/solid'
import { urlFor } from '../sanity'

export default function RestaurantCards({ id, imgUrl, title, rating, genre, address, short_description, dishes, long, lat,}){

	const navigation = useNavigation();
    return (
        <TouchableOpacity 
			onPress={()=> {
				navigation.navigate('Restaurant', {
					id, imgUrl, title, rating, genre, address, short_description, dishes, long, lat
				})
			}}
			className = ' bg-gray-700  mr-3 shadow m-5 rounded-xl'
			style={{width: 300, height: 270}}
		>
            <Image source= {{
				uri: urlFor(imgUrl).url(),
            }}
            className='h-36 w-64 rounded-md self-center mt-3 mx-2'/>
            <View className = 'px-5 pb-4'>
				<Text className = 'font-bold text-lg pt-2'>{title}</Text>
				<View className='flex-row mt-1'>
					<StarIcon color = 'green' opacity = {0.5} size = {22}></StarIcon>
					<Text className='text-green-500'>{rating}  {genre}</Text>
				</View>
				<View className='flex-row mt-1'>
					<LocationMarkerIcon color = 'white' opacity = {0.4} size = {22}/>
					<Text className = 'text-xs text-white'>Nearby {address}</Text>
				</View>
			</View>
        </TouchableOpacity>
    )
        
}