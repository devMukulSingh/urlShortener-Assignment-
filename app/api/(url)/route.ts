import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { getDataFromToken } from "@/actions/getDataFromToken";

export async function POST(
    req:NextRequest
){
    try{

        const { url } = await req.json();
        
        if(!url ) return NextResponse.json({error:'Url is required'},{status:400});
        
        const tokenData = getDataFromToken(req);
        
        if(!tokenData) return NextResponse.json({error:'Unauthenticated'},{status:403});

        const currUser = await prisma.user.findFirst({
            where:{
                id:tokenData.id
            }
        });
        
        if(!currUser) return NextResponse.json({error:'Unauthorised'},{status:401});
        
        const shortedUrl = await prisma.url.findFirst({
            where:{
                userId:tokenData.id,
                redirectUrl:url,
            }
        });

        let shortUrl = `http://localhost:3000/api/${shortedUrl?.nanoId}`;

        if(shortedUrl) return NextResponse.json(shortUrl,{status:201});

        const nanoId = nanoid(5);

        const res = await prisma.url.create({
            data:{
                nanoId,
                redirectUrl:url,
                user:{
                    connect:{
                        id:currUser.id
                    }
                }         
            },
        });
        
        shortUrl = `http://localhost:3000/api/${nanoId}`;

        return NextResponse.json(shortUrl,{status:201});

    }catch(e){
        console.log(`Error in POST url req ${e}`);
        return NextResponse.json({error:`Error in POST url req ${e}`},{status:500});
    }
}

export async function GET(
    req:NextRequest,
){
    try{
        
        const { id:userId } = getDataFromToken(req);

        if( !userId ) return NextResponse.json({ error:'User id is required'},{status:403});

        const urlData = await prisma.url.findMany({
            where:{
                userId
            }
        });

        return NextResponse.json({ urlData },{status:200});
        
    }
    catch(e){
        console.log(`Error in GET ALL url req ${e}`);
        return NextResponse.json({error:`Error in GET ALL url req ${e}`}, { status:500})
    }

}