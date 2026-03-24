// card for each movies
import { StyleSheet, Text, TouchableOpacity, View, Image, Dimensions } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { icons } from '@/constants/icons'

const screenWidth = Dimensions.get("window").width;
const imageWidth = screenWidth / 3 - 10;
const MovieCard = ({id, poster_path, title, vote_average, release_date} : Movie) => {
    
  return (
    // clickable cards: https://docs.expo.dev/versions/latest/sdk/router/#link
   <Link href={`/movie/${id}`} asChild>
    {/* https://reactnative.dev/docs/touchableopacity */}
    <TouchableOpacity style={styles.touchBarOpc}>
        <Image 
            source={{
                uri: poster_path
                ? `https://image.tmdb.org/t/p/w500${poster_path}` 
                : 'https://placehold.co/600x400/1a1a1a/ffffff.png'
            }} 
            style={styles.movieCardImage} 
            resizeMode="cover"      
        />
        <Text style={styles.movieTitle} numberOfLines={1}>{title}</Text>
        <View style={styles.movieDetails}>
            {Array.from({ length: Math.round(vote_average / 2) }).map((_, i) => (
                <Image
                    key={i}
                    source={icons.star}
                    style={styles.movieStar}
                />
            ))}
            {/* <Text style={styles.movieTextStar} className="text-xs text-white font-bold uppercase">
                {Math.round(vote_average / 2)}
            </Text> */}
        </View>

        <View style={styles.movieReleaseDetails}>
          <Text style={styles.movieReleaseDate}className="text-xs text-light-300 font-medium mt-1">
            {release_date?.split("-")[0]}
          </Text>
          {/* <Text style={styles.movie} className="text-xs font-medium text-light-300 uppercase">
            Movie
          </Text> */}
        </View>
    </TouchableOpacity>
    </Link>
  )
}

export default MovieCard

const styles = StyleSheet.create({
    touchBarOpc:{
        width:"30%",
        marginRight:3,
    },
    cardText:{
        color:"white",
        fontSize: 10,
    },
    movieCardImage:{
        // this makes all images in a row proportionally take same width
        width:Dimensions.get("window").width/4,
        height:208,
        borderRadius:8,
    },
    movieTitle:{
        fontSize:14,
        fontWeight:"bold",
        color:"white",
        marginTop:2,
    },
    movieStar:{
        width:16,
        height:16,
    },
    movieTextStar:{
        color:"white",
        fontSize:12,
        fontWeight:"bold",
        textTransform:"uppercase",
    },
    movieDetails:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"flex-start",
        columnGap:4,
    },
    movieReleaseDetails:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
    },
    movieReleaseDate:{
        fontSize:12,
        color:"#9CA4AB",
        fontWeight:500,
        marginTop:4
    },
    movie:{
        fontSize:12,
        fontWeight:500,
        color:"#9CA4AB",
        textTransform:"uppercase",
    }

})