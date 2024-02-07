import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import  bcrypt  from "bcrypt";

export default async function POST(
    req:Request
){
    try {
        const { name,email,password } = await req.json();
    
        if(!name ) return NextResponse.json({error:'Name is required'},{status:400});
    
        if(!email ) return NextResponse.json({error:'email is required'},{status:400});
    
        if(!password ) return NextResponse.json({error:'password is required'},{status:400});
        
        const salt = await bcrypt.genSalt(10);
        const hashPassword = bcrypt.hashSync(password,salt);

        const user = await prisma.user.create({
            data : {
                name,
                email,
                password:hashPassword
            }
        });
        return NextResponse.json({msg:'user Created',user},{status:201});
    } catch (error) {
        console.log(`Error in User POST req ${error}`);
        return NextResponse.json({error:`Error in User POST req ${error}`},{status:500});
    }

} 