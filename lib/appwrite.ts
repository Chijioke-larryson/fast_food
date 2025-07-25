import {Account, Avatars, Client, Databases} from "react-native-appwrite";

export const appwriteConfig ={
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
    platform: "com.jsm_fast_food" ,
    databaseId: '687e9499003c799255a4',
    userCollectionId: "687e94e2001abdba738f",
}





export  const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint!)
    .setProject(appwriteConfig.projectId!)
    .setPlatform(appwriteConfig.platform!)

export const account = new Account( client);
export const databases = new Databases(client);
const avatar = new Avatars(client);


