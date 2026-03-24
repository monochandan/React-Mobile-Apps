import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import images from "@/constants/images";
import icons from "@/constants/icons";
import {colors} from "@/constants/colors";
import { Dimensions } from 'react-native';
import { login } from '@/lib/appwrite';
import { useGlobalContext } from '@/lib/global-provider';
import { Redirect } from 'expo-router';



const SignIn = () => {
    const {refetch, loading, isLogged} = useGlobalContext();
    const handleLogin = async () => {
        // console.log("I will handle login no worries!!");
        const result = await login();

        // we have to check this in every page. So instead of doing this in every components
        // make a seperate file in parent components to check is user is logged in or not.
        // we need this line in sign-in component to check logged in or not
        // but inside the app/root we have a _layout.tsx which automatically check the user state(logged in 
        // or logged out ). so the components inside that folders , no needs extra line of code to check the 
        // users states.
        if(!loading && isLogged) return <Redirect href="/"/>
        if(result){
            // console.log('Login Success');
            // redirect to the home screen [ line: 18]
            console.log("from sign-in.tsx refetch()")
            refetch();
            // output: 
            //  "$id": "69bea8ec24afa4336325",
            //     "$createdAt": "2026-03-21T14:19:24.154+00:00",
            //     "$updatedAt": "2026-03-21T22:04:59.636+00:00",
            //     "name": "monotosh kumar das chandan",
            //     "registration": "2026-03-21T14:19:24.150+00:00",
            //     "status": true,
            //     "labels": [],
            //     "passwordUpdate": "",
            //     "email": "daschandanm@gmail.com",
            //     "phone": "",
            //     "emailVerification": true,
            //     "phoneVerification": false,
            //     "mfa": false,
            //     "prefs": {},
            //     "targets": [
            //         {
            //         "$id": "69bea8ec35a540cc0ac5",
            //         "$createdAt": "2026-03-21T14:19:24.219+00:00",
            //         "$updatedAt": "2026-03-21T14:19:24.219+00:00",
            //         "name": "",
            //         "userId": "69bea8ec24afa4336325",
            //         "providerId": null,
            //         "providerType": "email",
            //         "identifier": "daschandanm@gmail.com",
            //         "expired": false
            //         }
            //     ],
            //     "accessedAt": "2026-03-21T14:19:24.150+00:00",
            //     "impersonator": false,
            //     "impersonatorUserId": null,
            //     "avatar": "[object Object]"
            //   }
        }else {
            Alert.alert('Error', 'Failed to login');
        }
    }
  return (
    <SafeAreaView className="bg-white h-full" style={styles.safeAreaView}>
        <ScrollView style={styles.scrollView}>
            <Image style={styles.scrollViewimage} source={images.onboarding} resizeMode='contain'/>

            <View  className="px-10" style={styles.mainView}>
                <Text className="text-base text-center uppercase font-rubik text-black-200" style={styles.welcomeText}>
                    Welcome To Real S-cout
                </Text>

                <Text style={styles.tagLineText}>
                    Lets Get You Closer To {"\n"}
                    <Text style={styles.taglineInnerText}>Your Ideal Home</Text>
                </Text>

                <Text style={styles.loginText}>
                    Login to Real Scout with Google
                </Text>
                {/* button in react native */}
                <TouchableOpacity
                    onPress={handleLogin}
                    style={styles.touchableOpct}
                    // className="bg-white shadow-md shadow-zinc-300 rounded-full w-full py-4 mt-5"
                >
                    <View  
                        style={styles.googleIconView} 
                        // className="flex flex-row items-center justify-center"
                    >
                        <Image
                            style={styles.googleImg}
                            source={icons.google}
                            // className="w-5 h-5"
                            resizeMode="contain"
                        />
                        <Text 
                            style={styles.googlecontinue} 
                            className="text-lg font-rubik-medium text-black-300 ml-2"
                        >
                            Continue with Google
                        </Text>
                    </View>
                </TouchableOpacity>
        </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn

const styles = StyleSheet.create({
    safeAreaView:{
        backgroundColor:"white",
        height:"100%",
    },
    scrollView:{
        height:"100%",
    },
    scrollViewimage:{
        width:"100%",
        height:Dimensions.get("window").height * 0.66,
        // height:"66.666667%",
    },
    mainView:{
        paddingLeft:40,
        paddingRight:40,
    },
    welcomeText:{
        fontSize:16,
        textAlign:"center",
        textTransform:"uppercase",
        fontFamily:"rubikRegular",
        color:colors.black200,
    },
    tagLineText:{
        fontSize:30,
        fontFamily:"Rubik-Bold",
        color:colors.black300,
        textAlign:"center",
        marginTop:8,
    },
    taglineInnerText:{
        color:colors.primary300,
    },
    loginText:{
        fontSize:18,
        fontFamily:"Rubik-Regular",
        textAlign:"center",
        marginTop:48,
        color:colors.black200,
    },
    touchableOpct:{
        // position:"absolute",
        // bottom:20,
        // left:0,
        // right:0,
        // marginInline:20,
        // backgroundColor:"#AB8BFF",
        // borderRadius:8,
        // paddingBlock:14,
        // display:"flex",
        // flexDirection:"row",
        // alignItems:"center",
        // justifyContent:"center",
        // zIndex:50,
        backgroundColor:"#AB8BFF",
        borderRadius:9999,
        width:"100%",
        paddingBlock:16,
        marginTop:20,
        shadowColor: '#ccc',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.3,
        paddingVertical: 16,
        // boxShadow:0 4 6 -1 rgba(209, 213, 219, 0.1), 0 2 4 -2 rgba(209, 213, 219, 0.06),
    },
    googleIconView:{
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
    },
    googleImg:{
        width:20,
        height:20,
        // marginRight:5,
    },
    googlecontinue:{
        fontSize:18,
        fontFamily:"Rubik-Medium",
        color:colors.black300,
        marginLeft:8,
    }
})