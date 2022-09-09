import { View, Text, Image, TouchableOpacity} from 'react-native'
import React, {useState} from 'react'
import { urlFor } from '../sanity'
import { MinusCircleIcon, PlusCircleIcon } from 'react-native-heroicons/solid';
import { useDispatch, useSelector } from 'react-redux';
import { addToBasket, removeFromBasket, selectBasketItems, selectBasketItemsWithId } from '../features/basketSlice';

export default function DishRow({id, name, description, price, image}) {
    const [isPressed, setIsPressed] = useState(false);
    const dispatch = useDispatch();
    const items = useSelector((state)=>selectBasketItemsWithId(state, id))

    const addItemToBasket = () => {
        dispatch(addToBasket({id, name, description, price, image}));
    }

    const removeItemFromBasket = () => {
        if(!items.length > 0) return;
        dispatch(removeFromBasket({id}))
    }
    return (
        <>
            <TouchableOpacity onPress={()=>setIsPressed(!isPressed)} >
                <View className='flex-row'>
                    <View>
                        {image && (<Image source={{
                            uri: urlFor(image).url()
                        }}
                        style= {{borderWidth: 1,
                        borderColor: 'black', width: 100, height: 100}}
                        className='bg-gray-300 p-4 m-4'/>)}
                    </View>
                    <View className='flex-1 pr-2 m-4'>
                        <Text className='text-lg mb-1 text-white'>{name}</Text>
                        <Text className=' text-white'>{description}</Text>
                        <Text className=' text-white mt-2'>$ {price}</Text>
                    </View>

                </View>
            </TouchableOpacity>
            {isPressed && (
                <View className='bg-gray-500 px-4 pt-2'>
                    <View className='flex-row items-center spcae-x-2 pb-3'>
                        <TouchableOpacity>
                            <MinusCircleIcon onPress={removeItemFromBasket} color={items.length > 0 ? '#00CCBB' : 'gray' } size={40}/>
                        </TouchableOpacity>
                        <Text className='text-white'>{items.length}</Text>
                        <TouchableOpacity>
                            <PlusCircleIcon onPress={addItemToBasket} color='#00CCBB' size={40}/>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </>
    )
}