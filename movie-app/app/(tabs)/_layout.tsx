import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import {images} from "@/constants/images";
import {icons} from "@/constants/icons";

// create a component for ImageBackground to use it for every tab
const TabIcon = ({focused, icon, title}: any) => {
    if(focused){
         return (
           <ImageBackground
                            source={images.highlight}
                            // className="flex flex-row w-full flex-1 min-w-[200px] min-h-14 mt-4 justify-center items-center rounded-full overflow-hidden"
                            style={styles.homeImageBackground}
                        >
                            {/* tintColor="#151312" className='size-5' */}
                            <Image source={icon} style={styles.homeImage}></Image>
                        
                            <Text style={styles.homeText} className='text-secondary text-base'>{title}</Text>
            </ImageBackground>     
        )
    }
    return (
        <View style={styles.unfocusedView}>
            <Image source={icon} style={styles.unfocusedImage}/>
        </View>
    )
       
}
const _Layout = () => {
  return (
    <Tabs
    // https://reactnavigation.org/docs/bottom-tab-navigator
    screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle:{
            width:'100%',
            height:'100%',
            justifyContent: 'center',
            alignItems:'center',
        },
        tabBarStyle:{
            backgroundColor:'#0f0D23',
            borderRadius: 50,
            marginHorizontal: 20,
            marginBottom: 36,
            height: 52,
            position: 'absolute',
            overflow: 'hidden',
            // borderWidth: 1,
            borderColor: '#0f0D23'
        },
        // tabBarLabelStyle:{
        //     fontSize: 20,
        //     fontFamily:'Georgia',
        //     fontWeight: 300, 
        // }
    }}
    >
        {/* Hiding the spacific page headers (index, saved, search, profile) from (tabs)/[index/search/saved/profile] from the top bar */}
        <Tabs.Screen
            name='index'
            options={{
                title: 'Home',
                headerShown: false,
                // https://reactnavigation.org/docs/bottom-tab-navigator/#api-definition
                // https://reactnavigation.org/docs/customizing-tabbar
                tabBarIcon:({ focused }) =>(
                    // rendering the custome component.
                        <TabIcon focused={focused} 
                                icon = {icons.home} 
                                title="Home" />
                )
            }}
        />
        <Tabs.Screen
            name='saved'
            options={{
                title: 'Saved',
                headerShown: false,
                tabBarIcon:({ focused}) => (
                    <TabIcon focused={focused} 
                                icon = {icons.save} 
                                title="Save" />
                )
                
            }}
        />
        <Tabs.Screen
            name='search'
            options={{
                title: 'Search',
                headerShown: false,
                tabBarIcon:({ focused}) => (
                    <TabIcon focused={focused} 
                                icon = {icons.search} 
                                title="Search" />
                )
            }}
        />
        <Tabs.Screen
            name='profile'
            options={{
                title: 'Profile',
                headerShown: false,
                tabBarIcon:({ focused}) => (
                    <TabIcon focused={focused} 
                                icon = {icons.person} 
                                title="Profile" />
                )
            }}
        />
    </Tabs>
     
  )
}

export default _Layout

const styles = StyleSheet.create({
    homeImageBackground:{
        flex: 1,
        flexDirection: "row",
        width: "100%",
        minWidth: 110,
        minHeight: 64,
        marginTop: 16,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 9999,
        overflow: "hidden",
    },
    homeImage:{
        tintColor:"#151312",
        width:20,
        height: 20,

    },
    homeText:{
        marginLeft: 2,
        fontWeight: "semibold",
        marginStart: 2,
    },
    unfocusedView: {
        width: 100,
        height: 100,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 16,
        borderRadius: 9999,
    },
    unfocusedImage:{
        tintColor:"#A8B5DB",
        width:20,
        height:20,
    },
})