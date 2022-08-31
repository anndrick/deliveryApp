import { View, Text, TouchableOpacity, SafeAreaView, Image, ScrollView } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux';
import { selectRestaurant } from '../features/restaurantSlice';
import { selectBasketItems, selectBasketTotal } from '../features/basketSlice';
import { useMemo } from 'react';
import { useState } from 'react';
import { XCircleIcon } from 'react-native-heroicons/solid'
import { urlFor } from '../sanity';
import { removeFromBasket } from '../features/basketSlice';
export default function BasketScreen() {

    const navigation = useNavigation();
    const restaurant = useSelector(selectRestaurant);
    const items = useSelector(selectBasketItems);
    const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);
    const dispatch = useDispatch();
		const basketTotal = useSelector(selectBasketTotal);
    useMemo(() => {
        const groupedItems = items.reduce((results, item) => {
            (results[items.id] = results[items.id] || []).push(item);
            return results;
        }, {})
        setGroupedItemsInBasket(groupedItems);
    }, [items])

    return (
			<SafeAreaView>
			<View>
				<View>
					<View>
						<Text className='text-lg font-bold text-center'>BasketScreen</Text>
						<Text className='text-center text-gray-400'>{restaurant.title}</Text>
					</View>
					<TouchableOpacity 
						onPress={navigation.goBack}
						className='rounded-full bg-gray-100 absolute top-3 right-5'
					>
						<XCircleIcon color='#00CCBB' height={50} width={50}/>
					</TouchableOpacity>
				</View>
				<View className='flex-row items-center space-x-4 px-4 py-3 bg-white my-5'>
					<Image source={{
						uri: 'https://links.papareact.com/wru'
						}}
						className='h-7 w-7 bg-gray-300 p-4 rounded-full'
					/>
					<Text className='flex-1'> Deliver in 50-3239 min</Text>
					<TouchableOpacity>
						<Text className='text=[#00CCBB]'>change</Text>
					</TouchableOpacity>
				</View>

				<ScrollView className='divide-y divide-gray-2'>
					{Object.entries(groupedItemsInBasket).map(([key, items])=>(
						<View 
							key={key}
							className='flex-row items-center space-x-3 bg-white py-2 px-5'	
						>
							<Text>{items.length}</Text>
							{items[0]?.image && (<Image 
								source={{uri: urlFor(items[0]?.image).url()}}
								className='h-12 w-12 rounded-full'
							/>)}
							<Text className='flex-1'>{items[0]?.name}</Text>
							<Text className='text-gray-600'>{items[0]?.price}</Text>
							<TouchableOpacity>
								<Text className='text-[#00CCBB] text-xs'
									onPress={()=>dispatch(removeFromBasket({id: key}))}
									>Remove</Text>
							</TouchableOpacity>
						</View>
					))}
				</ScrollView>
					<View className='p-5 bg-whitw mt-5 space-y-4'>

						<View className='flex-row justify-between'>
							<Text className='text-gray-400'> Subtotal </Text>
							<Text className='text-gray-400'>$ {basketTotal}</Text>
						</View>

						<View className='flex-row justify-between'>
							<Text className='text-gray-400'> Delivery Fee: </Text>
							<Text className='text-gray-400'>$ 5000</Text>
						</View>

						<View className='flex-row justify-between'>
							<Text className='text-gray-400'> Order Total</Text>
							<Text className='text-gray-400'>$ {basketTotal + 5000}</Text>
						</View>

						<TouchableOpacity className='rounded-lg bg-[#00CCBB] p-4' onPress={()=> navigation.navigate('PreparingOrderScreen')}>
							<Text className='text-center text-white text-lg font-bold'> Place Order</Text>
						</TouchableOpacity>

					</View>
			</View>
			</SafeAreaView>
    )
}