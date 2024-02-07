import { NextResponse } from "next/server";

export async function GET(
    req:Request
){
    try{

        const res = NextResponse.json({message:'Logout Successful', success:true},{status:200});
        
        res.cookies.set('token',"",{
            httpOnly:true
        });

        return res;

    }catch(e){
        console.log(`Error in Logout  ${e}`);
        return NextResponse.json({error:`Error in Logout ${e}`},{status:500});
    }
}