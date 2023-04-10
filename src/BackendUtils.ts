import type { Collection } from "mongodb";

export const returnURLsList = async (collection:Collection)=> {
    const projection = {URL:1,_id:0};

    let firstTime = Date.now();
    const urlList = await collection.find().toArray();
    let secondTime = Date.now();

    let timeDiff = secondTime - firstTime;

    console.log("Time to pull all data ", timeDiff);

    firstTime = Date.now();
    const URLOnly = await collection.find().project(projection).toArray();
    secondTime = Date.now();
    timeDiff =  secondTime - firstTime;

    console.log("Time to pull only needed data ",timeDiff)

    const serializedUrls = urlList.map((item) => JSON.parse(JSON.stringify(item,(key,value) => key === '_id'? value.toString(value) : value)))

    //console.log(serializedUrls);

    return serializedUrls


}