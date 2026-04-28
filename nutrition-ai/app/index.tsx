import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import {Redirect} from 'expo-router'
import { supabase } from '@/utils/supabase';
import Auth from './(auth)/auth';
import Account from './(auth)/Account';

const App = () => {
   
  const [userId, setUserId] = useState<string | null>(null)
  const [email, setEmail] = useState<string | undefined>(undefined)
  useEffect(() => {
    supabase.auth.getClaims().then(({ data: { claims } }) => {
      if (claims) {
        setUserId(claims.sub)
        setEmail(claims.email)
      }
    })
    supabase.auth.onAuthStateChange(async (_event, _session) => {
      const {
        data: { claims },
      } = await supabase.auth.getClaims()
      if (claims) {
        setUserId(claims.sub)
        setEmail(claims.email)
      } else {
        setUserId(null)
        setEmail(undefined)
      }
    })
  }, [])
  return <View>{userId ? <Account key={userId} userId={userId} email={email} /> : <Auth />}</View>
   // const [session, setSession] = useState(null);

   // useEffect(() => {
   //    const check = async () => {
   //       const {data} = await supabase.auth.getSession();
   //       console.log("session data: ", data.session)
   //       setSession(data.session)
   //    }
   //    check();
   // },[])

   // // if (session === null) return null;

   // return session ? <Redirect href="/(tabs)"/> : <Redirect href="/(auth)/auth"/>
   // check here if the user
      // const checkUser = async () => {
   // const { data } = await supabase.auth.getSession();

      //   if (data.session) {
      //     router.replace("/home");   // already logged in
      //   } else {
      //     router.replace("/sign-in"); // not logged in
      //   }
      // };
   // if (data.session){
   //    return <Redirect href="/(tabs)"/>
   // }
   // else{
   //    return <Redirect href="/(auth)/auth"/>
   // }
   // return <Redirect href="/(tabs)"/>
}

export default App