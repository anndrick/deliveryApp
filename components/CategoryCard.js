import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import React from 'react';

export default function CategoryCard({ imgUrl, title }) {
  const navigation = useNavigation();
  return (
    <View className='' style={{width: 200, height: 170}}>
      <TouchableOpacity className='p-5 mx-1 bg-gray-700 rounded-xl items-center' 
        onPress={() => {navigation.navigate('CategoryRestaurant', title)}}>
        <Image
          source={{
            uri: imgUrl
          }}
          className='h-20 w-20'
        />
        <Text className='text-center py-3'>{title}</Text>
      </TouchableOpacity>
    </View>
  );
}
