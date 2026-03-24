import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import {useLocalSearchParams, useRouter} from "expo-router"
import useFetch from '@/services/useFetch';
import { fetchMovieDetails } from '@/services/api';
import {icons} from "@/constants/icons";

// reusable components
interface MovieInfoProps {
  label: string;
  value?: string | number | null;
}
const MovieInfo = ({ label, value }: MovieInfoProps) => (
  <View style={styles.reusableMovieInfoView}>
    <Text style={styles.reusableMovieInfoLabelText}>{label}</Text>
    <Text style={styles.reusableMovieInfoValueText}>
      {value || "N/A"}
    </Text>
  </View>
);

const MovieDetails = () => {
   const router = useRouter();
  // getting the id of clicked movie poster
  const { id } = useLocalSearchParams();
  // console.log(id);
  // from, data, loading, error, query <-- useFetch() <-- appwrite.ts/fetchMovies()
  const {
    data:movie,
    loading,
  } = useFetch(() =>
    fetchMovieDetails(id as string)
  );

  return (
     <View style={styles.mainContainer}>

      <ScrollView contentContainerStyle={{
        paddingBottom:80,
      }}>
        <View>
          {/* POSTER */}
          <Image 
            style={styles.moviePosterImage} 
            source={{uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`}}
            resizeMode='stretch'/>
        </View>

        {/* text under poster */}
        <View style={styles.textUnderPosterView}>
          <Text style={styles.titeText}>{movie?.title}</Text>
          <View style={styles.movieDetailsView}>
            <Text style={styles.releaseDateText} >
              {movie?.release_date?.split("-")[0]}
            </Text>
            <Text style={styles.runtimeText}>{movie?.runtime}m</Text>
          </View>
        </View>

        <View style={styles.movieVoteView}>
            <Image source={icons.star} style={styles.movieStar} />

            <Text style={styles.voteAverageText}>
              {Math.round(movie?.vote_average ?? 0)}/10
            </Text>

            <Text style={styles.voteCounts} className="">
              ({movie?.vote_count} votes)
            </Text>

          </View>


          {/* reusable components */}
          <MovieInfo label="Overview" value={movie?.overview} />
          <MovieInfo
            label="Genres"
            value={movie?.genres?.map((g) => g.name).join(" • ") || "N/A"}
          />

          <View className="flex flex-row justify-between w-1/2">
            <MovieInfo
              label="Budget"
              value={`$${(movie?.budget ?? 0) / 1_000_000} million`}
            />
            <MovieInfo
              label="Revenue"
              value={`$${Math.round(
                (movie?.revenue ?? 0) / 1_000_000
              )} million`}
            />
          </View>

          <MovieInfo
            label="Production Companies"
            value={
              movie?.production_companies?.map((c) => c.name).join(" • ") ||
              "N/A"
            }
          /> 
      </ScrollView>
        <TouchableOpacity
        style={styles.touchableOpacity}
        // className="absolute bottom-5 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50"
        onPress={router.back}
      >
        
        <Image
          source={icons.arrow}
          style={styles.arrowImage}
          // className="size-5 mr-1 mt-0.5 rotate-180"
          tintColor="#fff"
        />
        <Text style={styles.goBackText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  )
}

export default MovieDetails;

const styles = StyleSheet.create({
  mainContainer:{
    flex:1,
    backgroundColor:"#030014",
  },
  moviePosterImage:{
    width:"100%",
    height:550,
  },
  textUnderPosterView:{
    flexDirection:"column",
    alignItems:"flex-start",
    justifyContent:"center",
    marginTop:20,
    paddingInline:20,
  },
  titeText:{
    color:"white",
    fontWeight:"bold",
    fontSize:20,
  },
  movieDetailsView:{
    flexDirection:"row",
    alignItems:"center",
    columnGap:4,
    marginTop:8,
  },
  releaseDateText:{
    fontSize:14,
    color:"#A8B5DB",
  },
  runtimeText:{
    fontSize:14,
    color:"#A8B5DB",
  },
  movieStar:{
        width:16,
        height:16,
    },
  movieVoteView:{
    flexDirection:"row",
    width:"30%",
    alignItems:"center",    
    color:"#A8B5DB",
    backgroundColor:"#221F3D",
    paddingInline:8,
    paddingBlock:4,
    borderRadius:6,
    columnGap:4,
    marginTop:8,
  },
  voteAverageText:{
    color:"white",
  },
  voteCounts:{
    color:"#A8B5DB",
    fontSize:14,
  },
  reusableMovieInfoView:{
    flexDirection:"column",
    alignItems:"flex-start",
    justifyContent:"center",
    marginTop:20,

  },
  reusableMovieInfoLabelText:{
    fontWeight:400,
    fontSize:14,
    color:"#D6C7FF",
  },
  reusableMovieInfoValueText:{
    color:"#A8B5DB",
    fontWeight:"bold",
    fontSize:14,
    marginTop:8,
  },
  touchableOpacity:{
    position:"absolute",
    bottom:20,
    left:0,
    right:0,
    marginInline:20,
    backgroundColor:"#AB8BFF",
    borderRadius:8,
    paddingBlock:14,
    display:"flex",
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"center",
    zIndex:50,
  },
  arrowImage:{
    width:20,
    height:20,
    marginRight:4,
    marginTop:2,
    transform: [{ rotate: '180deg' }],
  },
  goBackText:{
    color:"white",
    fontWeight:600,
    fontSize:16,
  },
  // #AB8BFF
});