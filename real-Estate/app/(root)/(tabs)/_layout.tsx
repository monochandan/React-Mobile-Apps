import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'

import icons from '@/constants/icons'
// creating a components
const TabIcon = ({ focused, icon, title }: {focused: boolean; icon: any; title: string}) => (
    <View className='flex-1 mt-3 flex flex-col items-center'>
        <Image 
            source={icon} 
            tintColor={focused ? '#0061ff' : '#666876'}
            resizeMode='contain'
            className='size-6'/>

        <Text className={`${focused ? 
                        'text-primary-300 font-rubik-medium' 
                        : 'text-black-200 font-rubik'} 
                        text-xs w-full text-center mt-1`}>
            {title}
        </Text>
    </View>
)

// navigate through tabs
const TabsLayout = () => {
  return (
    // how the tab will lookes like
    <Tabs
        screenOptions={{tabBarShowLabel:false,
                        tabBarStyle: {
                            backgroundColor:'white',
                            position:'absolute',
                            borderTopColor: '#0061FF1A',
                            borderTopWidth: 1,
                            minHeight: 70,
                        }
        }}
    >
        {/* inside the tab, we will have 3 button */}
        <Tabs.Screen 
            name="index"
            options={{
                title:'Home',
                headerShown: false,
                tabBarIcon: ({focused}) => (
                    // <View>
                    //     <Text className='font-rubik-bold size-10'>Home</Text>
                    // </View>
                    <TabIcon icon={icons.home} focused={focused} title="Home"/>
                )
            }}       
        />

        <Tabs.Screen 
        // has to match the page name
            name="explore"
            options={{
                title:'Explore',
                headerShown: false,
                tabBarIcon: ({focused}) => (
                    // <View>
                    //     <Text className='font-rubik-bold size-10'>Home</Text>
                    // </View>
                    <TabIcon icon={icons.search} focused={focused} title="Explore"/>
                )
            }}       
        />

        <Tabs.Screen 
            name="profile"
            options={{
                title:'Profile',
                headerShown: false,
                tabBarIcon: ({focused}) => (
                    // <View>
                    //     <Text className='font-rubik-bold size-10'>Home</Text>
                    // </View>
                    <TabIcon icon={icons.person} focused={focused} title="Profile"/>
                )
            }}       
        />

       
    </Tabs>
  )
}

export default TabsLayout

const styles = StyleSheet.create({})