// we are creating services so that even if in future we want to take out this authentication logic that we can take it out.
// Basically we are just creating class here 

import conf from "../conf/conf.js";

import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }
    async createaccount ({email, password,name}){
        try{
           const userAccount=await this.account.create(ID.unique(), email,password,name);
            if(userAccount){
                // call another method
                // directly login kra dena h 
                return this.login({email,password});
            }else{
                return userAccount;
            }

        }catch(error){
            throw error ;
        }
    }

    // creating login functionality
    async login({email,password}){
        try{
           return await this.account.createEmailSession(email, password);
        } catch(error){
        throw error;
    }
}

// checking if the user is logged in or not 
async getCurrentUser(){
    try{
        return await this.account.get();
    }catch(error){
        console.log("Appwrite Service :: getCurrentUser :: error", error.message);
    }

    return null ;  // agr account mila hi ni to return null hoga and in case try and catch m koi error aata h to bhi return null hi hoga
}

async logout(){

    try{
        return await this.account.deleteSessions(); // saare sessions delete ho jaye
    }catch(error){
        console.log('Appwrite Service:: logout :: Error', error.message);
    }
}
}

const authService = new AuthService();  // object

export default authService ;

// we want jab object koi banaye tab actually m client banna chahiye aur tb account ka access hona chahiye