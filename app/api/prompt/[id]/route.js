import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

// GET (read)
export const GET = async (request,{ params }) => {
    try{
        await connectToDB();

        const prompt = await Prompt.findById(params.id).populate('creator');
        if(!prompt) return new Response("Prompt not found", { status : 404 })

        return new Response(JSON.stringify(prompt),{status : 200 })

    }catch(error) {
        return new Response("Failed to fetch all prompts", { status : 500})
        console.log(error,'this error is coming from export const GET file path is -> app\api\prompt\route.js');
        alert(`${error}   this error is coming from export const GET file path is -> app\api\prompt\route.js`)

    }
}

// PATCH (update)
export const PATCH = async (request, { params }) => {
    const { prompt, tag } = await request.json();

    try {
        await connectToDB();

        const existingPrompt = await Prompt.findById(params.id);

        if(!existingPrompt) return new Response("Prompt not found", { status : 404 })

        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        await existingPrompt.save();

        return new Response(JSON.stringify(existingPrompt), {status:200})
    } catch(error) {
        return new Response("Failed to update prompt",{status:500})
        alert(`${error}  this error is coming from route.js file PATCH and file path is -> app\api\prompt\[id]\route.js`)
    }
}

// DELETE (delete)
export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();

        await Prompt.findByIdAndRemove(params.id);

        return new Response("Prompt deleted successfully", {status : 200});

    } catch (error){
        return new Response("Failed to delete prompt",{status : 500});
        console.log(error,'this error is coming from route.js file and DELETE function file path is -> app\api\prompt\[id]\route.js')
        alert(`${error}  this error is coming from route.js file and DELETE function file path is -> app\api\prompt\[id]\route.js`) 
      
    }
}