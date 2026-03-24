import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect } from 'react'
import NoResults from '@/components/NoResults';
import { router, useLocalSearchParams } from 'expo-router';
import { useAppwrite } from '@/lib/useAppwrite';
import { getLatestProperties, getProperties } from '@/lib/appwrite';
import Search from '@/components/search';
import { Card } from '@/components/Cards';
import Filters from '@/components/Filters';
import icons from '@/constants/icons';

const Explore = () => {
  // const {user} = useGlobalContext();
    // from getProperties() > appwrite.ts
    const params = useLocalSearchParams<{ query?: string; filter?:string}>();
  
    // get the latest properties to show in features section
    // const {data:latestProperties, loading:latestPropertiesLoading} = useAppwrite({
    //   fn:getLatestProperties
    // })
  
    // get properties to show in the recommended section, also user can filter by clicking
    const {data:properties, loading:propertiesLoading, refetch} = useAppwrite({
      fn:getProperties,
      params:{
        filter:params.filter!,
        query:params.query!,
        limit:20,
      },
      skip: true, // skip specific number of elements as needed
    })
  
    // to show the dynamic values in cards. properties is tha data. The id of the property.
    const handleCardPress = (id: string) => router.push(`/properties/${id}`);
  
    // when filter and query changes, we have to recall the function to show the latest data
    useEffect(() => {
      refetch({
        filter:params.filter!,
        query:params.query!,
        limit:6,
      })
    }, [params.filter, params.query])
  return (
    <SafeAreaView className="bg-white h-full">
      {/* <Button title="Seed" onPress={seed}/> */}
      <FlatList
        data={properties}
        renderItem={({item}) =><Card item={item} onPress={() => handleCardPress(item.$id)}/>}
        keyExtractor={(item) => item.$id}
        
        numColumns={2}
        contentContainerClassName="pb-32"
        columnWrapperClassName="flex gap-5 px-5"
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          propertiesLoading ? (
            <ActivityIndicator size="large" className="text-primary-300 mt-5"/>
          ):
          <NoResults/>
        }
        ListHeaderComponent={
          <View className='px-5'>
            <View className='flex flex-row items-center justify-between mt-5'>
              <TouchableOpacity className='flex flex-row bg-primary-200 rounded-full size-11 items-center justify-center'
              onPress={() => router.back()}>
                  <Image source={icons.backArrow} className='size-5'/>
              </TouchableOpacity>
              <Text className='text-base mr-2 text-center font-rubik-medium text-black-300'>Search for Your Ideal Home</Text>
              <Image source={icons.bell} className='size-5'/>
            </View>
            <Search/>
            <View className='mt-5'>
              <Filters />
              <Text className='text-xl font-rubik-bold text-black-300 mt-5'>Found {properties?.length} Properties</Text>
            </View>
          </View>
        }
      />

    </SafeAreaView>
      
  );
}

export default Explore

const styles = StyleSheet.create({})