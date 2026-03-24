import { Client, Account, ID, Models, Avatars, OAuthProvider, Databases, Query } from 'react-native-appwrite';
import * as Linking from 'expo-linking';
import {openAuthSessionAsync} from 'expo-web-browser';

// https://appwrite.io/docs/quick-starts/react-native
export const config = {
    platform: 'com.SoloCreator.realState',
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
    // databases env variables
    databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
    galarriesTableId: process.env.EXPO_PUBLIC_APPWRITE_GALLERIES_TABLE_ID,
    reviewTableId:process.env.EXPO_PUBLIC_APPWRITE_REVIEWS_TABLE_ID,
    agentsTableId:process.env.EXPO_PUBLIC_APPWRITE_AGENTS_TABLE_ID,
    propertiesTableId:process.env.EXPO_PUBLIC_APPWRITE_PROPERTIES_TABLE_ID,

}
export const client = new Client();

client
        .setEndpoint(config.endpoint!)
        .setProject(config.projectId!)
        .setPlatform(config.platform!);

// generate user avatar based on users first and last name MD or KM
// https://appwrite.io/docs/references/cloud/client-react-native/avatars
export const avatar = new Avatars(client);
// to create new user account.
export const account = new Account(client);

// add database functionalities
export const databases = new Databases(client);

// create new action
// 1. authenticate our user (Login)
export async function login()
{
    try {
        // https://docs.expo.dev/versions/latest/sdk/linking/#linkingcreateurlpath-namedparameters
        const redirectUri = Linking.createURL('/');

        // Allow the user to login to their account using the OAuth2 provider of their choice
        // https://appwrite.io/docs/references/cloud/server-nodejs/account#createOAuth2Token
        const response = await account.createOAuth2Token(
            OAuthProvider.Google,
            redirectUri
        )
        console.log(response)
        if(!response)
            throw new Error("Failed to Login")

        // open a web browser session for oAuth process to continue.
        // webBrowser: A library that provides access to the system's web browser and supports handling redirects.
        // https://docs.expo.dev/versions/latest/sdk/webbrowser/#webbrowseropenauthsessionasyncurl-redirecturl-options
        const browserResult = await openAuthSessionAsync(
            response.toString(),
            redirectUri
        )
        console.log(browserResult)
        //if not succeed
        if(browserResult.type !== 'success')
            throw new Error("Failed to login (browserResult type is empty)")

        // if succeed, extract the query parameters (url --> secret)
        const url = new URL(browserResult.url)
        // console.log(url)
        // extract the secret and userid from the url
        const secret = url.searchParams.get('secret')?.toString();
        const userId = url.searchParams.get('userId')?.toString();
        // console.log(secret)
        // console.log(userId)

        if(!secret || !userId)
            throw new Error("No userID, or no secret!");

        // create account
        // https://appwrite.io/docs/references/cloud/server-nodejs/account
        const session = await account.createSession(userId, secret);

        if(!session) throw new Error("failed to create new session");

        return true;
        
    } catch (error) {

        console.log(error);
        return false
        
    }
}

// LogOUt
export async function logout()
{

    try {
        // https://appwrite.io/docs/references/cloud/server-nodejs/account
        const result = await account.deleteSession('current')

        return true;
        
    } catch (error) {
        console.log(error);
        return false
    }
    

}

// get the user info to createa avatar of the user
export async function getCurrentUser(){
    try {

        // https://appwrite.io/docs/references/cloud/server-nodejs/users
        const response = await account.get();
        // avatar : https://appwrite.io/docs/references/cloud/server-nodejs/avatars
        if(response.$id){
            const userAvatar = avatar.getInitials(response.name);

            return{
                ...response,
                avatar: userAvatar.toString(),
            }
        }
        
        
    } catch (error) {
        console.log(error);
        return null;
    }
}

// get the data from databases (after seeding)

// FEATURED LIST index.tsx
export async function getLatestProperties() {
  try {
    const result = await databases.listDocuments(
      config.databaseId!,
      config.propertiesTableId!,
      [Query.orderAsc("$createdAt"), Query.limit(5)]
    );

    return result.documents;
  } catch (error) {
    console.error(error);
    return [];
  }
}

// RECOMMENDATION in index.tsx
export async function getProperties({
  filter,
  query,
  limit,
}: {
  filter: string;
  query: string;
  limit?: number;
}) {
  try {
    const buildQuery = [Query.orderDesc("$createdAt")];

    if (filter && filter !== "All")
      buildQuery.push(Query.equal("type", filter));

    if (query)
      buildQuery.push(
        Query.or([
          Query.search("name", query),
          Query.search("address", query),
          Query.search("type", query),
        ])
      );

    if (limit) buildQuery.push(Query.limit(limit));

    const result = await databases.listDocuments(
      config.databaseId!,
      config.propertiesTableId!,
      buildQuery
    );

    return result.documents;
  } catch (error) {
    console.error(error);
    return [];
  }
}


