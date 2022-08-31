import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    restaurant: {
        id: null,
        imgUrl: null,
        dishes: null,
        image: null,
        rating: null,
    }
}

export const restaurantSlice = createSlice({
    name: 'restaurant',
    initialState,
    reducers: {
      setRestaurant: (state, action) => {
        state.restaurant = action.payload;
      }
    },
  })
  
  export const { addToRestaurant, removeFromRestaurant } = restaurantSlice.actions;

 export const selectRestaurant = (state) => state.restaurant.restaurant;
  
  export default restaurantSlice.reducer;
