import { StyleSheet, Text, View, Image, TextInput } from 'react-native';
import React from 'react';
import { icons } from '@/constants/icons';

interface Props{
    placeholder: string;
    onPress?: () => void;
    value?: string; // ? - making it optional..
    onChangeText?:(text:string) => void;
}

const SearchBar = ({placeholder, onPress, value, onChangeText}: Props) => {
   
  return (
    <View style={styles.searchBarView}>
      <Image source={icons.search} style={styles.searchBarViewImage} resizeMode='contain'/>
      {/* https://reactnative.dev/docs/textinput */}
      <TextInput
            onPress={onPress}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            placeholderTextColor="#a8b5db"
            style={styles.searchBarViewTextInput}    
      />
    </View>
  )
}

export default SearchBar

const styles = StyleSheet.create({
    searchBarView:{
        flexDirection:"row",
        alignItems:"center",
        backgroundColor:"#0F0D23",
        borderRadius: 1,
        paddingInline:20,
        paddingBlock: 16,
    },
    searchBarViewImage:{
        width:20,
        height:20,
        tintColor:"#ab8bff",
    },
    searchBarViewTextInput:{
        flex:1,
        marginLeft:8,
        color: 'white'
    }
})