import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (request, { params }) => {
    try{
        await connectToDB();

        const prompts = await Prompt.find({
            creator : params.id
        }).populate('creator');

        return new Response(JSON.stringify(prompts),{status : 200 })

    }catch(error) {
        return new Response("Failed to fetch all prompts", { status : 500})
        console.log(error,'this error is coming from export const GET file path is -> app\api\prompt\route.js');
        alert(`${error}   this error is coming from export const GET file path is -> app\api\prompt\route.js`)

    }
}