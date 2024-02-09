import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
    req:NextRequest,
    { params } : { params : {userId:string}}
){
    try{

        const { userId } = params;

        const { data : { toUpdateUrl,id, originalUrl} } = await req.json();
        
        if(!userId) return NextResponse.json({error:'Unauthenticated'},{status:403});
        
        if(!id) return NextResponse.json({error:'id is required'},{status:400});
        
        if(!toUpdateUrl ) return NextResponse.json({error:'RedirectUrl is required'},{status:400});

        if(!originalUrl ) return NextResponse.json({error:'originalUrl is required'},{status:400});
        
        const urlData = await prisma.url.update({
            where:{
                redirectUrl:originalUrl,
                userId,
                id
            },
            data : {
                redirectUrl:toUpdateUrl
            }
        });
        
        return NextResponse.json({ urlData },{ status:200});
    }
    catch(e){
        console.log(`Error in url PUT handler ${e}`);
        return NextResponse.json({error:`Error in url PUT handler ${e}`},{ status:200});
    }

}