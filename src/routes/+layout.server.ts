import {MongoClient} from 'mongodb';
import { SECRET_URI } from '$env/static/private';
import { returnURLsList } from '../BackendUtils.js';


export async function load({}){
    const client = new MongoClient(SECRET_URI);
    let dbError = {
        hasError: false,
        error: ''
    }
    let URLList:string[] = [];

    try{
        await client.connect();
    }

    catch(error:any){
        dbError.hasError = true;
        dbError.error = error.message?? "Error Connecting to DB"
    }

    const dbName = 'AllUsers';
    const db = client.db(dbName);
    const collName = 'users';
    const collection = db.collection(collName);

    try{
        URLList = await returnURLsList(collection);
        //console.log("URL List")
    }
    catch(error:any){
        dbError.hasError = true;
        dbError.error = error.message?? "Error retrieving URL List";
    }

    return{dbError,URLList}

}