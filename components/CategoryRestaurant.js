import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, Image, TextInput} from 'react-native';
import React, {useState, useEffect} from 'react';
import SanityClient, { urlFor } from '../sanity';
import RestaurantCards from './RestaurantCards';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ArrowLeftIcon, ChevronDownIcon, UserIcon, SearchIcon, AdjustmentsIcon } from 'react-native-heroicons/solid';

export default function CategoryRestaurant(title) {
    const [ categoryRestaurant, setcategoryRestaurant ] = useState ([]);
    const catgoryRestaurantOnly = [];
    const navigation = useNavigation();
    const category = title.route.params;
    useEffect(()=>{
        SanityClient.fetch(`
            *[_type == 'restaurant'] {
                ...,
                type->{
                    name
                }
            }
            `,
        )
        .then((data) => {
            setcategoryRestaurant(data);
        });
    }, [])
    categoryRestaurant.forEach(element => {
        if(category === element.type.name)
        catgoryRestaurantOnly.push(element)
    })
    return (
        <SafeAreaView className='bg-gray-900 h-full w-full'>
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
                <Text className='text-white text-xl px-4 text-center'>Restaurantes de {category}</Text>
                <TouchableOpacity className='absolute top-20 mt-10 left-4 p-2 bg-gray-100 rounded-full z-1000'  onPress={navigation.goBack}>
                    <ArrowLeftIcon size={20} color={'#00CCBB'}/>
                </TouchableOpacity>
                <View className='py-4 px-5 mt-4 items-center w-full'>
                    {catgoryRestaurantOnly?.map((restaurant) => (
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
                </View>
            </ScrollView>
        </SafeAreaView>
    )

}