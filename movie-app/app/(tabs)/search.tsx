import { Dimensions, Image, StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import useFetch from "@/services/useFetch";
import MovieCard from '@/components/MovieCard';
import SearchBar from '@/components/SearchBar';
import { fetchMovies } from '@/services/api';
import {updateSearchCount} from '@/services/appwrite';

//
const search = () => {

  const [searchQuery, setSearchQuery] = useState("");
  // featching the movies using the custome hook
  // useFetch from services/useFetch.tsx
  // fetchMovies from services/api.ts
   const {
    data: movies = [],
    loading,
    error,
    refetch: loadMovies,
    reset,
  } = useFetch(() => fetchMovies({ query: searchQuery }), false); // false --> disallowing the user to auto fetch, he needs to type
  

  // use effect each time the search query changed
  // Debounced search effect
  // 1. load movies
  useEffect(() => {

    // from services/appwrite.ts
    // updateSearchCount(searchQuery, movies[0]); // NULL ERROR
    console.log(searchQuery);
    const timeoutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        await loadMovies();
        // Call updateSearchCount only if there are results
        // if (movies?.length! > 0 && movies?.[0])
        //   await updateSearchCount(searchQuery, movies[0]);
      } else {
        reset();
      }
    }, 500);
      // stop tipying for 5000 milisecond, it will show the result by calling api

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  // 2. this will change when the movie will change
  useEffect(() => {
    // Call updateSearchCount only if there are results
      if (movies?.length! > 0 && movies?.[0])
      {
          updateSearchCount(searchQuery, movies[0]);
      }
        
  }, [movies])

  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };
  return (
    <View style={styles.mainView}>
      <Image 
        source={images.bg} 
        style={styles.backgroundImage} 
        resizeMode='cover'/>

      <FlatList 
        data={movies} 
        renderItem={({item}) => <MovieCard {...item}/>}
        keyExtractor={(item) => item.id.toString()}
        style={styles.flatList}
        numColumns={3}
        columnWrapperStyle={{
                      justifyContent:'flex-start',
                      gap: 20,
                      paddingRight: 5,
                      marginBottom:10,
                    }} 
        contentContainerStyle={{ paddingBottom: 100 }}
        // https://reactnative.dev/docs/flatlist#listheadercomponent
        // header component will always show the image and search bar, If
        // searched movie found or not, it will show those.
        ListHeaderComponent={
          <>
            <View style={styles.listHeaderComponentImageView}>
                 <Image source={icons.logo} style={styles.listHeaderComponentImageViewImage} />
            </View>

            <View style={styles.searchBarView}>
              <SearchBar
                placeholder="Search for a movie"
                value={searchQuery}
                onChangeText={handleSearch}
              />
            </View>

            {loading && (
              // https://reactnative.dev/docs/activityindicator
              <ActivityIndicator
                size="large"
                color="#0000ff"
                style={styles.activityIndicator}
              />
            )}

            {error && (
              <Text style={styles.errorText}>Error: {error.message}</Text>
            )}
            {/* <Text style={styles.searchChildText}>{movies.length}</Text> */}
            {!loading && // not loading
             !error && // not an error
              searchQuery.trim() && // look on search query and trim
              movies?.length! > 0 && ( // if search query exist, then check if exist any movies on that query
              // (
                <Text style={styles.searchParentText}>
                  Search Results for{" "}
                  <Text style={styles.searchChildText}>{searchQuery}</Text>
                </Text>
              )}
          </>
        } 
        // what will the user see, if there is not data in the flat list
        ListEmptyComponent={
          !loading && !error ? (
            <View style={styles.listEmptyComponentView}>
              <Text style={styles.listEmptyComponentViewText}>
                {searchQuery.trim()
                  ? "No movies found"
                  : "Start typing to search for movies"}
              </Text>
            </View>
          ) : null
        }
      />
      
    </View>
  )
}

export default search

const styles = StyleSheet.create({
  mainView:{
    flex:1,
    backgroundColor:"#030014"
  },
  backgroundImage:{
    position:"absolute",
    width: Dimensions.get("window").width,
    zIndex:0,
  },
  flatList:{
    paddingInline:20,
  },
  listHeaderComponentImageView:{
    width:"100%",
    flexDirection:"row",
    justifyContent:"center",
    marginTop:80,
    alignItems:"center",
  },
  listHeaderComponentImageViewImage:{
    width:48,
    height:40,
    marginBottom:10, 
  },
  searchBarView:{
    marginBlock:20,
  },
  activityIndicator:{
    marginBlock:12,
  },
  errorText:{
    paddingInline:20,
    marginBlock:12,
    color:"dark-red",
  },
  searchParentText:{
    fontSize:20,
    color:"white",
    fontWeight:"bold",
  },
  searchChildText:{
    color:"#AB8BFF",
  },
  listEmptyComponentView:{
    marginTop:40,
    paddingInline:20,
  },
  listEmptyComponentViewText:{
    textAlign:"center",
    color:"#6a7282",
  }

})