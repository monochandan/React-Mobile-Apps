import { Text, View, StyleSheet, Image, Dimensions, ScrollView, ActivityIndicator, FlatList } from "react-native";
import { Link, useRouter } from 'expo-router'
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import SearchBar from "@/components/SearchBar";
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
import MovieCard from "@/components/MovieCard";
import { getTrendingMovies } from "@/services/appwrite";
import TrandingCard from "@/components/TrandingCard";
// import {useRouter} from 'expo-router';
export default function Index() {
   // navigation from one state to another
    const router = useRouter();

  //const {width, height} = Dimensions.get("window");

  // data, loading, error, query <-- useFetch() <-- appwrite.ts/trendingMovies()
   const {
    data: trandingMovies, 
    loading: trendingLoading, 
    error: trandingError } = useFetch(getTrendingMovies);

  // data, loading, error, query <-- useFetch() <-- appwrite.ts/fetchMovies()
  const {
    data: movies, 
    loading: moviesLoading, 
    error: moviesError} = useFetch(() => fetchMovies({
    query: ''
  }))
  return (
    <View style={styles.container}>
      <Image
        source={images.bg}
        // className="absolute z-0"
        resizeMode="cover"
        style={styles.backgroundImage}
      />

      {/* https://reactnative.dev/docs/scrollview */}
      <ScrollView style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}>

        <Image source={icons.logo} style={styles.scrollViewImage}/>

        {moviesLoading || trendingLoading ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            style={styles.moviesLolading}          
          />
        ) : moviesError || trandingError ? (
          <Text>Error:{moviesError?.message || trandingError?.message}</Text>
        ) : (
              <View style={styles.searchBarView}>
                <SearchBar
                  onPress={() => router.push("/search")}
                  placeholder="Search through 300+ movies online"
                />
              {/* if exist trending movies  loading*/}
                {trandingMovies && (
                <View style={styles.trandingMoviesView}>
                  <Text style={styles.trandingMoviesViewText}>
                    Trending Movies
                  </Text>
                  <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.trandingMoviesViewFlatlist}
                    data={trandingMovies}
                    contentContainerStyle={{
                      gap: 26,
                    }}
                    // renderItem={({item, index}) =>(
                    //   <Text style={styles.tempoText}>{item.title}</Text>
                    // )}
                    renderItem={({ item, index }) => (
                      <TrandingCard movie={item} index={index} />
                    )}
                    keyExtractor={(item) => item.movie_id.toString()}
                    ItemSeparatorComponent={() => <View style={styles.itemSeperatorComponentView} />}
                />
              </View>
            )}

              <>
              {/* className="text-lg text-white font-bold mt-5 mb-3" */}
                <Text style={styles.movieHeaderText} >
                    Latest Movies
                </Text> 

                <FlatList
                  // https://reactnative.dev/docs/flatlist
                  style={styles.flatList}
                  // className="mt-2 pb-32"
                  scrollEnabled={false}
                    data={movies}
                    renderItem={({item}) =>(
                      // <Text style={styles.movieText}>{item.title}</Text>
                      <MovieCard
                      //  we need all of the properties of the items
                      {...item}
                      />
                    )}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={3} 
                    columnWrapperStyle={{
                      justifyContent:'flex-start',
                      gap: 20,
                      paddingRight: 5,
                      marginBottom:10,
                    }} 
                              
                />            
              </>
        </View>
        )}

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({

  container:{
    flex:1,
    backgroundColor:"#030014",
  },
  backgroundImage:{
    position:"absolute",
    // to make the image size to window...
    width:Dimensions.get("window").width,
    // height:100,
    zIndex:0,
  },
  scrollView:{
    flex:1,
    paddingInline:20,
  },
  scrollViewImage:{
    width: 48,
    height: 40,
    marginTop: 80,
    marginBottom: 20,
    alignSelf:'center',
    
  },
  contentContainer:{
    minHeight: "100%", 
    paddingBottom: 10,
    padding:5,
  },
  searchBarView:{
    flex:1,
    marginTop:20,
  },
  moviesLolading:{
    marginTop: 40,
    alignSelf:"center"
  },
  flatList:{
    marginTop: 8,
    paddingBottom: 128,
  },
  movieText:{
    color: "white",
    fontSize: 18,
  },
  movieHeaderText:{
    fontSize: 18,
    fontWeight:"bold",
    color: "white",
    marginTop:20,
    marginBottom:12
  },
  trandingMoviesView:{
    marginTop:40,
  },
  trandingMoviesViewText:{
    fontSize:18,
    color:"white",
    fontWeight:"bold",
    marginBottom:12,
  },
  trandingMoviesViewFlatlist:{
    marginBottom:16,
    marginTop:12,
  },
  itemSeperatorComponentView:{
    width:16,
  },

  // container:{
  //   flex: 1,
  //   justifyContent: "center",
  //   alignItems: "center",
  //},
  tempoText: {
    fontSize:20,
    color: "white",
    fontWeight: "bold",
  }

});
