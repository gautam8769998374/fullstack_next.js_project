import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google';

import { connectToDB } from "@utils/database";
import User from "@models/user";

// console.log({
//     clientId : process.env.GOOGLE_ID,
//     clientSecret : process.env.GOOGLE_CLIENT_SECRET,
// })

const handler = NextAuth({
    providers : [
        GoogleProvider({
            clientId : process.env.GOOGLE_ID,
            clientSecret : process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    callbacks : {
        async session({ session }) {
            const sessionUser = await User.findOne({
                email : session.user.email
            })
    
            session.user.id = sessionUser._id.toString();
            // console.log(session.user.id,'this is coming from session id which file path is app\api\auth\[...nextauth]\route.js')
    
            return session;
    
        },
        async signIn({ profile }) {
            try {
                await connectToDB();
    
                // check if a user already exists
                const userExists = await User.findOne({
                    email : profile.email
                });
    
                //  if not, create a user
                if(!userExists) {
                    await User.create({
                        email : profile.email,
                        username : profile.name.replace(' ', '').toLowerCase(),
                        image : profile.picture
                    })
                }
    
                return true;
    
            } catch(error) {
                console.log(error, 'this error belongs to file path -> app\api\auth\[...nextauth]\route.js ');
                alert(`${error}    this error belong to route.js file and file path -> app\api\auth\[...nextauth]\route.js`);
                return false;
            }
        }
    }
})

export { handler as GET, handler as POST };