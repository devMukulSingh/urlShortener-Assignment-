import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function GET(
    req:NextRequest,
    {params}: { params : { nanoId: string} }
){
    try{

        const { nanoId } = params;
        
        if(!nanoId) return NextResponse.json({ error:'UrlId is required'},{status:400});
        
        const urlData = await prisma.url.findFirst({
            where:{
                nanoId
            }
        });
        
        if(!urlData) return NextResponse.json({error:'No url found'},{status:400});
        
        await prisma.url.update({
            where:{
                nanoId,
                id:urlData.id,
            },
            data:{
                clicks:{
                    increment:1,
                }
            }
        });
        
        return NextResponse.redirect(urlData?.redirectUrl);
    }
    catch(e){
        console.log(`Error in GET url req ${e}`);
        return NextResponse.json({error:`Error in GET url req ${e}`}, { status:500})
    }

}