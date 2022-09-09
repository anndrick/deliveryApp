
import React, { useLayoutEffect, useState, useEffect } from 'react';
import { View, Text, TextInput, SafeAreaView, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ChevronDownIcon, SearchIcon, AdjustmentsIcon, UserIcon } from 'react-native-heroicons/solid';
import Categories from '../components/Categories';
import FeaturedRow from '../components/FeaturedRow';
import  SanityClient  from '../sanity';
import BasketIcon from '../components/BasketIcon';

export default function Home() {
  const navigation = useNavigation();
  const [featuredCategories, setFeaturedCategories] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    });
  });

  useEffect(()=>{
    SanityClient.fetch(`
      *[_type == 'featured'] {
        ...,
        restaurants[]->{
          ...,
          dishes[]->
        }
      }
    `)
    .then((data) => {
      setFeaturedCategories(data)
    });
  })

  return (
    <>
      <BasketIcon className='absolute bottom-10 w-full z-1000'></BasketIcon>
      <SafeAreaView className='bg-gray-900'>
        <View className='flex-row w-100 py-4 px-5 justify-between mt-3'>
          <View>
            <Image
              source={{
                uri: 'http://links.papareact.com/wru'
              }}
              className='mt-2 h-12 w-12'
            />
          </View>
          <View className='flex-row items-center'>
            <Text className='text-lg items-center text-white'>
              Ubicación actual <ChevronDownIcon size={25} color='#00CCBB' />
            </Text>
            <UserIcon onPress={() => navigation.navigate('UserInfo')} size={30} color='#00CCBB'></UserIcon>
          </View>
        </View>
        <ScrollView vertical>
          <View className='flex-row items-center space-x-2 px-5 py-4 text-white'>
            <View className='flex-row space-x-2 flex-1 bg-gray-200 px-4 py-2 rounded-xl'>
              <SearchIcon size={35} color='gray' />
              <TextInput placeholder='Busca algo a tu antojo' keyboardType='default' />
            </View>
            <AdjustmentsIcon color='#00CCBB' />
          </View>

          <View className='flex-row px-5 py-4'>
            <Categories/>
          </View>
          <View className='mb-10 pb-20'>

            {featuredCategories?.map((category) => (
              <FeaturedRow
                key = {category._id}
                id={ category._id} 
                title={category.name}
                description={category.short_description}
              />
            ))}
          </View>
          
        </ScrollView>
      </SafeAreaView>
    </>
  );
}