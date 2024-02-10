import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(
    req:Request
){
    try{

        const res = NextResponse.json({message:'Logout Successful', success:true},{status:200});
        
        await res.cookies.set('userId','');
        await res.cookies.set('token','');
        // const cookieStore = cookies();
        // cookieStore.delete

        return res;

    }catch(e){
        console.log(`Error in Logout  ${e}`);
        return NextResponse.json({error:`Error in Logout ${e}`},{status:500});
    }
}