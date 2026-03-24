import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import {icons} from "@/constants/icons";

const profile = () => {
  return (
     <SafeAreaView style={styles.container}className="bg-primary flex-1 px-10">
      <View style={styles.viewinsidesafeArea}className="flex justify-center items-center flex-1 flex-col gap-5">
        <Image source={icons.person} className="size-10" tintColor="#fff" />
        <Text style={styles.text}className="text-gray-500 text-base">Profile</Text>
      </View>
    </SafeAreaView>
  )
}

export default profile

const styles = StyleSheet.create({
   container:{
    flex:1,
    backgroundColor:"#030014",
    paddingInline:40,
  },
  viewinsidesafeArea:{
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    flex:1,
    flexDirection:"column",
    gap:20,
  },
  text:{
    color:"white",
    fontiSize:16,
  }
})