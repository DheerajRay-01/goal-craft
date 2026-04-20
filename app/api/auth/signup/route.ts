import { apiResponse } from "@/lib/apiResponse";
import userModel from "@/models/user.model";
import { getZodErrorMsg } from "@/utils/getZodErrorMsg";
import { signupSchema } from "@/utils/validations/signupschema";
import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/db/connectDB";

export async function POST(request: NextRequest) {

await connectDB()
  try {
    const body = await request.json();
    const validation = signupSchema.safeParse(body);
    if (!validation.success) {
        const errorMsg = getZodErrorMsg(validation.error)
         return apiResponse(false, errorMsg, 400);
    }
    const {fullName,username,email,password} = validation.data
    const isExist = await userModel.findOne({$or:[{username},{email}]})
    if(isExist){
        return apiResponse(false,"User Already exist with this email or password",400)
    }
    const hashed = await bcrypt.hash(password,10)
    const user = await userModel.create({
        fullName,
        username,
        email,
        password:hashed
    })  
  return apiResponse(true, "user created successfully",200,user)
  } catch {
    return apiResponse(false, "something went wrong",400);
  }
}
