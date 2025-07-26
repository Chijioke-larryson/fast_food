import {Account, Avatars, Client, Databases, ID} from "react-native-appwrite";
import {CreateUserParams, SignInParams} from "@/type";
import signIn from "@/app/(auth)/sign-in";

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

 export const createUser  = async ({email, password, name }: CreateUserParams) =>{
     try{
         const newAccount = await account.create(ID.unique(), email, password, name)
         if (!newAccount) throw Error;

         await signIn({ email, password});

         const avatarUrl = avatar.getInitialsURL(name);

          return  await databases.createDocument(
             appwriteConfig.databaseId,
              appwriteConfig.userCollectionId,
              ID.unique(),
              {
                  accountId: newAccount.$id,
                  email, name, avatar, avatarUrl
              }
          );


     }catch (e) {
         throw  new Error(e as string);

     }


 }
const signUp = async ({ email, password }: SignInParams) => {
     try {
        const session  = await  account.createEmailPasswordSession( email, password)

     }catch (e) {
         throw new Error( e as string);

     }

}
