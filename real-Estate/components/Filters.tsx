import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { categories } from '@/constants/data'

const Filters = () => {

    const params = useLocalSearchParams<{filter?: string}>()
    const [selectCategory, setSelectedCategory] = useState(params.filter || 'All')

    const handleCategoryPress = (category: string) => {
        // do something on selected category
        // console.log("selected:", category)
        // setSelectedCategory(category)
        if(selectCategory === category){
            setSelectedCategory('All');
            console.log("params_1:", params.filter)
            router.setParams({filter:'All'})
            console.log("params_2:", params.filter)
            return 
        }
        setSelectedCategory(category)
        // setting the params value here. which will 
        // later be extracted in the index.tsx using localSearchParams
        router.setParams({filter: category})
        console.log("params_3:", params.filter)
    }
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} className='mt-3 mb-2'>
        {categories.map((item, index) =>(
            <TouchableOpacity key={index} 
            className={`flex flex-col items.start mr-4 px-4 py-2 rounded-full
                ${selectCategory === item.category? 'bg-primary-300' : 'bg-primary-100 border-primary-200'}`}
            onPress={() => handleCategoryPress(item.category)}
            >
                <Text className={`text-sm 
                    ${selectCategory === item.category? 
                        'text-accent-100 font-rubik-bold mt-0.5':
                        'text-black-300 font-rubik'}`}>{item.title}</Text>

            </TouchableOpacity>
        ))}
    </ScrollView>
  )
}

export default Filters