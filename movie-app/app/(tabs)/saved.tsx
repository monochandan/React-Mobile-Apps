import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import {icons} from "@/constants/icons";

const saved = () => {
 return (
      <SafeAreaView style={styles.container}>
       <View style={styles.viewinsidesafeArea}>
         <Image source={icons.save} tintColor="#fff" />
         <Text style={styles.text}>Save</Text>
       </View>
     </SafeAreaView>
   )
}

export default saved

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