import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useLayoutEffect } from 'react';
import { urlFor } from '../sanity'
import DishRow from '../components/DishRow';
import { ArrowLeftIcon, StarIcon, LocationMarkerIcon, QuestionMarkCircleIcon, ChevronRightIcon } from 'react-native-heroicons/solid';
import BasketIcon from '../components/BasketIcon';
import { useDispatch } from 'react-redux';
import { setRestaurant } from '../features/restaurantSlice';

export default function RestaurantScreen() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const {
        params: {
            id, imgUrl, title, rating, genre, address, short_description, dishes, long, lat
          }
    } = useRoute();
    
    useEffect(()=> {
      dispatch(setRestaurant({
        id, imgUrl, title, rating, genre, address, short_description, dishes, long, lat
      }))
    }, [dispatch])

    useLayoutEffect(() => {
      navigation.setOptions({
        headerShown: false,
      })
    },[])
  return (
    <>
      <BasketIcon className='z-1000'></BasketIcon>
      <ScrollView className='bg-gray-900'>
        <View className='relative'>
          <Image
            source={{
              uri: urlFor(imgUrl).url(),
            }}
            className='w-full h-56 bg-gray-900 p-4 rounded-lg'
          />
          <TouchableOpacity className='absolute top-14 left-5 p-2 bg-gray-100 rounded-full'  onPress={navigation.goBack}>
            <ArrowLeftIcon size={20} color={'#00CCBB'}/>
          </TouchableOpacity>
        </View>
        <View className='bg-gray-900'>
          <View className='px-4 pt-4'>
            <Text className='text-3xl font-bold text-white'>{title}</Text>
            <View className='flex-row space-x-2 my-1'>
              <View className='flex-row items-center space-x-1'>
                <StarIcon size={22} opacity={0.5} color={'green'}/>
                <Text className='text-xs text-white'>{`${rating} ${genre}`}</Text>
              </View>
            </View>
            <View className='flex-row items-center space-x-1 mt-1'>
              <LocationMarkerIcon color = 'white' opacity = {0.4} size = {22}/>
              <Text className = 'text-xs text-white'>Nearby {address}</Text>
            </View>
            <Text className='text-white mt-2 pb-4'>{short_description}</Text>
          </View>
          <TouchableOpacity className='flex-row items0center space-x-2 p-4 border-y border-gray-300' onPress={()=>navigation.navigate('FoodAllergy')}>
            <QuestionMarkCircleIcon color='white' opacity={0.5} size={22}/>
            <Text className='pl-2 flex-1 text-md font-bold text-white'>Have food allergy?</Text>
            <ChevronRightIcon color='#00CCBB'/>
          </TouchableOpacity>
        </View>

        <View>
          <Text className='px-4 pt-6 mb-3 font-bold text-xl text-white'>Menu</Text>
          {dishes?.map((dish => 
            <DishRow
              key={dish._id}
              id={dish._id}
              name={dish.name}
              description={dish.short_description}
              price={dish.price}
              image={dish.image}
            />
          ))}
        </View>
      </ScrollView>
    </>
  )
}