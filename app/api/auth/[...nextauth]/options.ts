import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/db/connectDB";
import userModel from "@/models/user.model";




export const    authOptions:NextAuthOptions= {
    providers:[
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                identifier: { label: "Email", type: "text "},
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials:any):Promise<any>{
                await connectDB()
                try {
                   const user =  await userModel.findOne({
                        $or:[
                            {email:credentials.identifier},
                            {username:credentials.identifier},
                        ]
                    })
                    if(!user){
                        throw new Error("user not found")
                    }

                    const isPasswordCorrect =   await bcrypt.compare(credentials.password,user.password)

                    if(isPasswordCorrect){
                        return user
                    }else{
                        throw new Error("incorrect password")
                    }

                } catch (error:any) {
                    throw new Error(error)
                }
            }
        })
    ],

    callbacks:{
        async jwt({ token, user}) {
           if(user){
             token._id = user._id?.toString()
            token.username = user.username
            token.email = user.email
            token.fullName = user.fullName
           }
            return token
        },
        async session({ session, token }) {
            if (token) {
                session.user._id = token?._id
                session.user.username = token?.username
                session.user.email = token?.email
                session.user.fullName = token?.fullName
            }
            return session
        },
    },

    pages:{
        signIn:'/login'
    },
    session:{
        strategy:"jwt"
    },
    secret:process.env.NEXT_AUTH_SECRET
}
