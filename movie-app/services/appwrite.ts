import {Client, Databases, ID, Query} from "react-native-appwrite";




// track the searches made by the user

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;

// new client for appwrite
// https://appwrite.io/docs/references/cloud/client-web/databases
const client = new Client()
            .setEndpoint('https://cloud.appwrite.io/v1')
            .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!)

const databases = new Databases(client);

export const updateSearchCount = async (query: string, movie: Movie) => {
    // console.log("Query from appwrite.ts: ", query)
    // console.log("Movie from appwrite.ts: ", movie)
    try{
        // Get a list of all the user's documents in a given collection
        //https://appwrite.io/docs/references/cloud/client-react-native/databases
        const result = await databases.listDocuments(
                DATABASE_ID,
                COLLECTION_ID,
                [Query.equal("searchTerm", query)] // optional
                // transactionId: '<TRANSACTION_ID>', // optional
                // total: false // optional
            );
            // call the appwrite app to browse the database  and check 
            // if a document already exist for the given search term
            if(result.documents.length > 0)
            {
                const existingMovie = result.documents[0];
                console.log("existing movies: ",existingMovie)
                // update existing one 
                await databases.updateDocument(
                    DATABASE_ID,
                    COLLECTION_ID,
                    existingMovie.$id,
                    {
                        count: existingMovie.count + 1,
                    }
                );
            }
            else{
                // create new one
                await databases.createDocument(
                    DATABASE_ID,
                    COLLECTION_ID,
                    ID.unique(),
                    {
                        searchTerm: query,
                        movie_id: movie.id,
                        title: movie.title,
                        count: 1,
                        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                    });
               }
        console.log(result);
    }catch(error)
    {
        console.log(error);
        throw(error);
    }
    
}

// promise -> the result will arrive leter
// Trending movie from interfaces.d.ts
export const getTrendingMovies = async (): Promise<
  TrendingMovie[] | undefined
> => {
  try {
    const result = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.limit(5),
      Query.orderDesc("count"),
    ]);

    // I don't know what type this is.
    // Treat this data as an array of TrendingMovie objects.
    return result.documents as unknown as TrendingMovie[];
  } catch (error) {
    console.error(error);
    return undefined;
  }
};