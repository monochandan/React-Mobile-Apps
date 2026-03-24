import { StyleSheet, Text, View, TouchableOpacity , Image} from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import MaskedView from '@react-native-masked-view/masked-view';
import { images } from '@/constants/images'
const TrandingCard = ({movie:{movie_id, title, poster_url}, index}: TrendingCardProps) => {
  return (
    <Link href={`/movie/${movie_id}`} asChild>
        <TouchableOpacity 
            style={styles.touchableOpacity}
            // className="w-32 relative pl-5"
            >

            <Image
                source={{ uri: poster_url }}
                style={styles.image}
                // className="w-32 h-48 rounded-lg"
                resizeMode="cover"
            />

            <View style={styles.viewMaskedview}>
                <MaskedView
                style={{ flex: 1, flexDirection: 'row', height: '100%' }}
                maskElement={
                        <Text style={styles.maskedViewText}>{index+1}</Text>
                    }
                >
                  <Image
                    source={images.rankingGradient}
                    // className="size-14"
                    style={styles.rankImage}
                    resizeMode="cover"
                    />  
                </MaskedView>

            </View>

             <Text
                style={styles.movieNameText}
                // className="text-sm font-bold mt-2 text-light-200"
                numberOfLines={2}
                >
                {title}
            </Text>
            
        </TouchableOpacity>
            
           
    </Link>
  )
}

export default TrandingCard

const styles = StyleSheet.create({
    touchableOpacity:{
        width:128,
        position:"relative",
        paddingLeft:20,
    },
    image:{
        width:128,
        height:192,
        borderRadius:8,
    },
    viewMaskedview:{
        position:"absolute",
        bottom:36,
        left:-14,
        paddingInline:8,
        paddingBlock:4,
        borderRadius:1,
    },
    maskedViewText:{
        fontWeight:"bold",
        color:"white",
        fontSize:60,
    },
    rankImage:{
        // color:"black",
        width:56,
        height:56,
    },
    movieNameText:{
        fontSize:14,
        color:"#A8B5DB",
        fontWeight:"bold",
        marginTop:8,

    },
})