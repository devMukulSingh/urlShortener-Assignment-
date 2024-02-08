import { cookies } from "next/headers"
import jwt from "jsonwebtoken";

export const getTokenDataInPage = () => {

    const cookieStore = cookies();

    const token:any = cookieStore.get('token')?.value ;

    const decodedToken:any = jwt.verify(token,process.env.JWT_SECRET!);
    return decodedToken;

}