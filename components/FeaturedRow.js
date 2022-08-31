import { View, Text, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ArrowRightIcon } from 'react-native-heroicons/outline';
import RestaurantCards from './RestaurantCards';
import SanityClient  from '../sanity';

export default function FeaturedRow({ id, title, description }) {
  const [restaurants, setRestaurants] = useState ([]);
  useEffect(()=>{
    SanityClient.fetch(`
      *[_type == 'featured' && _id == $id] {
        ...,
        restaurants[]->{
          ...,
          dishes[]->,
          type->{
            name
          }
        },
      }[0]
    `,{id})
    .then((data) => {
      setRestaurants(data?.restaurants);
    });
  }, [])

  return (
    <View className='pt-1'>
      <View className='mt 4 flex-row items-center justify-between px-4'>
        <Text className='font-bold text-lg'>{title}</Text>
        <ArrowRightIcon color='#00CCBB' />
      </View>
      <Text className='text-xs text-gray-500 px-4'>{description}</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className='pt-4'
        contentContainerStyle={{
          paddingHorizontal: 15
        }}
      >
        {/*Restaurant Card*/}
        {restaurants?.map((restaurant) => (
          <RestaurantCards
            key={restaurant._id}
            id={restaurant._id}
            imgUrl={restaurant.image}
            title={restaurant.name}
            rating={restaurant.rating}
            address={restaurant.address}
            genre={restaurant.type?.name}
            short_description={restaurant.short_description}
            dishes={restaurant.dishes}
            long={restaurant.long}
            lat={restaurant.lat}
          />
        ))}
      </ScrollView>
    </View>
  );
}