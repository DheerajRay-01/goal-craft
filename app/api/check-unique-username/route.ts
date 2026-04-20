import { apiResponse } from "@/lib/apiResponse";
import connectDB from "@/lib/db/connectDB";
import userModel from "@/models/user.model";
import { getZodErrorMsg } from "@/utils/getZodErrorMsg";
import { usernameValidation } from "@/utils/validations/usernameSchema";
import z from "zod";

export async function GET(request:Request) {
    await connectDB();  
    try {
        const {searchParams} = new URL(request.url)

        const queryParams = {
            username: searchParams.get('username')
        }
        const result  = usernameValidation.safeParse(queryParams)
        if(!result.success){
            const usernameError = getZodErrorMsg(result.error)
            return apiResponse(false,usernameError,400)
        }
        const {username} = result.data
        const verifiedUsername = await userModel.findOne({username})
        console.log("user",verifiedUsername);
        if(verifiedUsername){
            return apiResponse(false,"username already taken",409)
        }
        // console.log("hello")
        return apiResponse(true,"username available",200)

    } catch (error) {
        return apiResponse(false,"Error checking username uniqueness",400)
    }
}