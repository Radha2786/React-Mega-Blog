// creating database service
import conf from "../conf/conf.js";
import { Client, ID , Databases, Storage, Query } from "appwrite";

export class Service {
    client = new Client();
    databases;
    bucket; // it could be named bucket or storage

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    // creating a function to create post
    async createPost({ title, slug, content, featuredImage, status, userId }) {
        console.log("title is------- ",title , slug , content, featuredImage, status, userId);
        try {
            
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug, // we are assuming slug as document id
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        } catch (error) {
            console.log("Appwrite service :: createPost :: error", error);
        }
    }

    // updatePost # phla parameter hum chahte h ki document id mile isliye we are taking slug as a first parameter then object vagera le rhe h
    async updatePost(slug,{ title, content, featuredImage, status}) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug, // we are assuming slug as document id
                {
                    title,
                    content,
                    featuredImage,
                    status,

                }
            )
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error", error);
        }
    }

    // DeletePost
    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug // we are assuming slug as document id
                )
                return true // han bhai delete ho gya h  
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error", error);
            return false
        }
    }

    // slug ko pass karte hue 1 post kese le skte h ya 1 document
    // # to get single post
    async getPost(slug){
        try{
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        }catch(error){
            console.log(`AppWrite Service :: getPost :: ${error}`)
            return false ; // in case post nahi mili hai to 
        }
    }

    // to list all documents whose status is active so here we have to use query
    async getPosts(queries= [Query.equal("status","active")]){
        try{
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries // we can directly give that query array here(see documentation) but here we are giving object
            )
        }catch(error){
            console.log("Appwrite serive :: getPosts :: error", error);
            return false;
        }
    }

    // file upload services
    async  uploadFile(file){
        try{
            const newFile = await this.bucket.createFile(conf.appwriteBucketId,
                ID.unique(),
                file  // 3rd parameter hume file milta h ki han file upload ho gyi hai
                )
                console.log(newFile);
                return newFile;
        }catch(error) {
            console.log("Appwrite serive :: uploadFile :: error", error);
            return false;
        }

    }
    // function to delete a file from the bucket
    async deleteFile(fileId){
        try{
            await this.bucket.deleteFile(
                'conf.appwriteBucketId',
                fileId,
            )
            return true;

        }catch(error){
            console.log("Appwrite service :: deleteFile :: error ", error);
            return false;
        }
    }

    // get file preview service
    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
            )
    }
}

const service = new Service();
export default service