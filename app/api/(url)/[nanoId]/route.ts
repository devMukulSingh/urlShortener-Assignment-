import { getDataFromToken } from "@/actions/getDataFromToken";
import { getTokenDataInPage } from "@/actions/getTokenDataInPage";
import { prisma } from "@/lib/prisma";
import { useSearchParams } from "next/navigation";
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

export async function DELETE(
    req:NextRequest
){
    try{
        const urlId = req.nextUrl.searchParams.get('urlId');
        
    const { id:userId } = getTokenDataInPage();
    
    if(!userId) return NextResponse.json( {error:'Unathorised'}, {status:401});
    
    await prisma.url.delete({
        where:{
            userId,
            id:urlId
        }
    });
    return NextResponse.json({ msg:"deleted Url"},{status:200});
    }
    catch(e){
        console.log(`Error in DELETE url handler ${e}`);
        return NextResponse.json({ error:`Error in DELETE url handler ${e}`},{status:500});
    }
}