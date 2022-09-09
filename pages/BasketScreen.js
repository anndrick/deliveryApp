import { View, Text, TouchableOpacity, SafeAreaView, Image, ScrollView } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux';
import { selectRestaurant } from '../features/restaurantSlice';
import { selectBasketItems, selectBasketTotal } from '../features/basketSlice';
import { useMemo } from 'react';
import { useState } from 'react';
import { XCircleIcon, MinusCircleIcon, PlusCircleIcon } from 'react-native-heroicons/solid'
import { urlFor } from '../sanity';
import { removeFromBasket } from '../features/basketSlice';
import { addFromBasket } from '../features/basketSlice';
import { useLayoutEffect } from 'react';

export default function BasketScreen() {

    const navigation = useNavigation();
    const restaurant = useSelector(selectRestaurant);
    const items = useSelector(selectBasketItems);
    const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);
    const dispatch = useDispatch();
		const basketTotal = useSelector(selectBasketTotal);

    useMemo(() => {
        const groupedItems = items.reduce((results, item) => {
            (results[item.id] = results[item.id] || []).push(item);
            return results;
        }, {})
        setGroupedItemsInBasket(groupedItems);
    }, [items])

		useLayoutEffect(()=>{
			navigation.setOptions({
				headerShown: false,
			})
		}, [])

    return (
			<SafeAreaView className='bg-gray-900 h-full'>
			<View className='mt-10'>
				<View>
					<View className='my-5'>
						<Text className='text-center text-white text-xl'>{restaurant.title}</Text>
					</View>
					<TouchableOpacity 
						onPress={navigation.goBack}
						className='rounded-full bg-gray-900 absolute right-5 mt-3'
					>
						<XCircleIcon color='#00CCBB' height={50} width={50}/>
					</TouchableOpacity>
				</View>
				<View className='flex-row items-center space-x-4 px-4 py-3 bg-gray-500 my-5'>
					<Image source={{
						uri: 'https://links.papareact.com/wru'
						}}
						className='h-12 w-12 bg-gray-300 p-4 rounded-full'
					/>
					<Text className='flex-1 text-white'> Deliver in 50-3239 min</Text>
					<TouchableOpacity>
						<Text className='text=[#00CCBB] text-white'>change</Text>
					</TouchableOpacity>
				</View>

				<ScrollView className='divide-y divide-gray-2'>
					{Object.entries(groupedItemsInBasket).map(([key, items])=>(
						<View 
							key={key}
							className='flex-row items-center space-x-3 bg-gray-500 py-2 px-5'	
						>
							<Text className='text-white'>x {items.length}</Text>
							{items[0].image && (<Image 
								source={{uri: urlFor(items[0]?.image).url()}}
								className='h-12 w-12 rounded-full'
							/>)}
							<Text className='flex-1 text-white'>{items[0]?.name}</Text>
							<TouchableOpacity>
                            	<MinusCircleIcon onPress={()=>dispatch(removeFromBasket({id: key}))} color={items.length > 0 ? '#00CCBB' : 'gray' } size={40}/>
                        	</TouchableOpacity>
							<Text className='text-white'>{items[0]?.price}</Text>
							<TouchableOpacity>
                            	<PlusCircleIcon onPress={()=>dispatch(addFromBasket({id: key}))} color='#00CCBB' size={40}/>
                        	</TouchableOpacity>
							{/* <TouchableOpacity>
								<Text className='text-[#cc0000] text-xs'
									onPress={()=>dispatch(removeFromBasket({id: key}))}
									>Remove</Text>
							</TouchableOpacity> */}
						</View>
					))}
				</ScrollView>

					<View className='p-5 bg-whitw mt-5 space-y-4'>

						<View className='flex-row justify-between'>
							<Text className='text-white'> Subtotal </Text>
							<Text className='text-white'>$ {basketTotal}</Text>
						</View>

						<View className='flex-row justify-between'>
							<Text className='text-white'> Delivery Fee: </Text>
							<Text className='text-white'>$ 5000</Text>
						</View>

						<View className='flex-row justify-between'>
							<Text className='text-white'> Order Total</Text>
							<Text className='text-white'>$ {basketTotal + 5000}</Text>
						</View>

						<TouchableOpacity className='rounded-lg bg-[#00CCBB] p-4' onPress={()=> navigation.navigate('PreparingOrderScreen')}>
							<Text className='text-center text-white text-lg font-bold'> Place Order</Text>
						</TouchableOpacity>

					</View>
			</View>
			</SafeAreaView>
    )
}