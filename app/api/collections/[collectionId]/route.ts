import Collection from "@/lib/models/collection";
import { connectToMongoDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, {params}: {params: {collectionId: string}}) => {
    try {
        await connectToMongoDB();

        const collection = await Collection.findById(await (params).collectionId);

        if(!collection){
            return new NextResponse(JSON.stringify({message: "Collection not found"}), {status: 404})
        }

        return NextResponse.json(collection, {status: 200})

    } catch (error) {
        console.log("[COLLECTION_GET_ERROR]", error)
        return new NextResponse("Internal Server Error", {status: 500})
        
    }
}

export const POST = async (req: NextRequest, {params}: {params: {collectionId: string}}) => {
    try {
        const {userId} = await auth();

        if(!userId){
            return new NextResponse("Unauthorized", {status: 401})
        }

        let collection = await Collection.findById(await (params).collectionId);

        if(!collection){
            return new NextResponse(JSON.stringify({message: "Collection not found"}), {status: 404})
        }

        const {title, description, image} = await req.json();

        if(!title || !image){
            return new NextResponse(JSON.stringify({message: "Title and image are required"}), {status: 400})
        }

        collection = await Collection.findByIdAndUpdate(await (params).collectionId, {
            title,
            description,
            image
        }, {new: true});

        await collection.save();

        return NextResponse.json(collection, {status: 200})

    } catch (error) {
       console.log("[COLLECTION_UPDATE_ERROR]", error)
        return new NextResponse("Internal Server Error", {status: 500})
    }
}

export const DELETE = async (req: NextRequest, {params}: {params: {collectionId: string}}) => {
    try{
        const {userId} = await auth();

        if(!userId){
            return new NextResponse("Unauthorized", {status: 401})
        }

        await connectToMongoDB();

        const {collectionId } = await params;

        await Collection.findByIdAndDelete(await (params).collectionId);
        return new NextResponse("Collection is deleted successfully", {status: 200})
    } catch(error){
        console.log("[COLLECTION_DELETE_ERROR]", error)
        return new NextResponse("Internal Server Error", {status: 500})
    }
}