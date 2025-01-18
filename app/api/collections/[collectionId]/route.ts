import Collection from "@/lib/models/collection";
import { connectToMongoDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (req: NextRequest, {params}: {params: {collectionId: string}}) => {
    try{
        const {userId} = await auth();

        if(!userId){
            return new NextResponse("Unauthorized", {status: 401})
        }

        await connectToMongoDB();

        const {collectionId } = await params;

        await Collection.findByIdAndDelete(params.collectionId);
        return new NextResponse("Collection is deleted successfully", {status: 200})
    } catch(error){
        console.log("[COLLECTION_DELETE_ERROR]", error)
        return new NextResponse("Internal Server Error", {status: 500})
    }
}