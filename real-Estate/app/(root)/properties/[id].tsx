import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
// https://docs.expo.dev/router/reference/url-parameters/
import { useLocalSearchParams } from 'expo-router';
const Property = () => {

    const {id} = useLocalSearchParams();
  return (
    <View>
      <Text>property</Text>
    </View>
  )
}

export default Property

const styles = StyleSheet.create({})