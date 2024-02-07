import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import  jwt from "jsonwebtoken";
import { useSearchParams } from "next/navigation";

export async function GET(
    req:NextRequest,
){
    try{
        const email = req.nextUrl.searchParams.get("email");
        const password = req.nextUrl.searchParams.get("password");

        if(!email) return NextResponse.json({error:'email is required'},{status:400});

        if(!password) return NextResponse.json({error:'password is required'},{status:400});
        
        const user = await prisma.user.findFirst({
            where:{
                email
            }
        });
        
        if( !user ) return NextResponse.json( {error:'Incorrect username/password'},{ status:401} );
        
        const isAuth = bcrypt.compareSync(password,user.password);
        
        if(!isAuth) return NextResponse.json({error:'Incorrect username/password'},{status:401});
        
        const tokenData = {
            id:user.id,
            email:user.email
        }
        const token = jwt.sign( tokenData, process.env.JWT_SECRET! ,{
            expiresIn :'1d',
        });

        const respose = NextResponse.json({msg:'Login success',sucess:true},{status:200});

        respose.cookies.set("token",token, {
            httpOnly:true
        });

        return respose;

    }catch(e){
        console.log(`Error in user GET request ${e}`);
        return NextResponse.json({error:`Error in user GET request ${e}`},{status:500});
    }

}
