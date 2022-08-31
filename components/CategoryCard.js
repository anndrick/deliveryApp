import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';

export default function CategoryCard({ imgUrl, title }) {
  return (
    <TouchableOpacity className='p-5'>
      <Image
        source={{
          uri: imgUrl
        }}
        className='h-16 w-16'
      />
      <Text className='text-center py-3'>{title}</Text>
    </TouchableOpacity>
  );
}
