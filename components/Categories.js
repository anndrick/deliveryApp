import { View, Text, ScrollView } from 'react-native';
import CategoryCard from './CategoryCard';
import React, {useState, useEffect} from 'react';
import SanityClient, { urlFor } from '../sanity'


export default function Categories() {

  const [ categories, setCategories ] = useState ([]);

  useEffect(()=>{
    SanityClient.fetch(`
      *[_type == 'categories']
    `,)
    .then((data) => {
      setCategories(data);
    });
  }, [])


  return (
    // {restaurants?.map((restaurant) => (

    // ))}
    <ScrollView 
      contentContainerStyle={{
        paddingHorizontal: 15,
        paddingTop: 10,
      }}
      horizontal 
      showsHorizontalScrollIndicator={false}>
        {categories?.map((category) => 
          { category.image && (<CategoryCard key = {category._id} imgUrl={urlFor(category.image).width(200).url()} title={category.name} alt='xd' />)}
        )}
    </ScrollView>
  );
}
