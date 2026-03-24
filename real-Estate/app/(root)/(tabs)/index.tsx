import { Link, router, useLocalSearchParams } from "expo-router";
import { Text, View, StyleSheet, Image, TouchableOpacity, FlatList, Button, ActivityIndicator } from "react-native";
import { colors } from "@/constants/colors"; 
import images from "@/constants/images";
import icons  from "@/constants/icons";
import fonts from "@/constants/fonts";
import { SafeAreaView } from "react-native-safe-area-context";
import Search from "@/components/search";
import { Card, FeaturedCard } from "@/components/Cards";
import Filters from "@/components/Filters";
import { useGlobalContext } from "@/lib/global-provider";
// import { Button } from "@react-navigation/elements";
// import "@/app/globals.css";
import seed from "@/lib/seed";
import { useAppwrite } from "@/lib/useAppwrite";
import { getLatestProperties, getProperties } from "@/lib/appwrite";
import { useEffect } from "react";
import NoResults from "@/components/NoResults";
export default function Index() {
  const {user} = useGlobalContext();
  // from getProperties() > appwrite.ts
  const params = useLocalSearchParams<{ query?: string; filter?:string}>();

  // get the latest properties to show in features section
  const {data:latestProperties, loading:latestPropertiesLoading} = useAppwrite({
    fn:getLatestProperties
  })

  // get properties to show in the recommended section, also user can filter by clicking
  const {data:properties, loading:propertiesLoading, refetch} = useAppwrite({
    fn:getProperties,
    params:{
      filter:params.filter!,
      query:params.query!,
      limit:6,
    },
    skip: true, // skip specific number of elements as needed
  })

  // console.log(properties)

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

          //  everythign previously built goes inside this:
        <View className="px-5">
          <View className="flex flex-row items-center justify-between mt-5">
            <View className="flex flex-row items-center">
                <Image source={{uri: user?.avatar}} className="size-12 rounded-full"/>
                <View className="flex flex-col items-start ml-2 justify-center">
                  <Text className="text-xs font-rubik text-black-200">Good Morning</Text>
                  <Text className="text-base font-rubik-medium text-black-300">{user?.name}</Text>
                </View>
            </View>
            <Image source={icons.bell} className="size-6"/>
          </View>

        <Search/>

        <View className="my-5">
            <View className="flex flex-row items-center justify-between">
                  <Text className="text-xl font-rubik-bold text-black-300">
                    Featured
                  </Text>
                  <TouchableOpacity>
                    <Text className="text-base font-rubik-bold text-primary-300">
                      See all
                    </Text>
                </TouchableOpacity>
               
            </View>

            {latestPropertiesLoading ? 
              <ActivityIndicator size="large" className="text-primary-300" />
            : !latestProperties || latestProperties.length === 0 ?
            <NoResults/> : (

            <FlatList
              data={latestProperties}
              renderItem={({item}) => <FeaturedCard item={item} onPress={() => handleCardPress(item.$id)}/>}
              keyExtractor={(item) => item.$id}
              horizontal
              bounces={false}
              showsHorizontalScrollIndicator={false}
              contentContainerClassName="flex gap-5 mt-5"
            /> )}

            <View className="my-5">
              <View className="flex flex-row items-center justify-between">
                    <Text className="text-xl font-rubik-bold text-black-300">
                      Our Recommendation
                    </Text>
                    <TouchableOpacity>
                      <Text className="text-base font-rubik-bold text-primary-300">
                        See all
                      </Text>
                  </TouchableOpacity>
                
              </View>

              <Filters/>

            </View>

       </View>
      </View>
      
      
      
       
   

        }
      />

    </SafeAreaView>
      
  );
}


  const styles = StyleSheet.create({

    introText:{
      fontFamily:"Rubik-Bold",
      color: colors.danger,
      fontSize:20,
      marginBlock:40,
    },

  });
