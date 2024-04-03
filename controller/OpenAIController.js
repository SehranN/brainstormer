const OpenAI = require('openai')
require("dotenv").config();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// const openai1 = new OpenAI({
//     apiKey: "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"
// });






const imageGeneration = async (req,res) => {
    try {

        const { prompt } = req.body
        const pythonProcess = spawn('python3', ['wordGen/PromptGenerator.py','prompt', prompt]);
        let dataFromPython = ''
        var improvedPrompt = ""

        pythonProcess.stdout.on('data', (data) => {
            dataFromPython += data;  
        });

        pythonProcess.stderr.on('data', (data) => {
            console.log(`Error from Python: ${data}`)  
        });

        pythonProcess.on('close', (code) => {
            console.log(`Python process exited with code ${code}`);
            console.log(`Data from Python: ${dataFromPython}`);
            improvedPrompt = dataFromPython  
        }); 

        console.log(prompt)
        const response = await openai.images.generate({
            model: 'dall-e-3',
            prompt,
            n: 1,
            size: "1024x1024",
            quality : "standard",
        })

        const imageUrl = response.data[0].url

        res.status(200).json({
            success: true,
            data: imageUrl
        })
    } 
    catch (error) {
        
        res.status(400).json({
            success: false,
            error: 'Image could not be generated' 
        })
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
        } else {
            console.log(error.message);
        }
    }
}






// const imageRecognition = async (req,res) => {
//     try{
//         const response = await openai1.chat.completions.create({
//             model: "gpt-4-vision-preview",
//             messages: [
//                 {
//                     role: "user",
//                     content: [
//                         { type: "text", text: "What's in this image?" },
//                         { type: "image_url", image_url: "https://pbs.twimg.com/media/Ez9ufTDXIAAV6FC.png" }
//                     ]
//                 }
//             ],
//             max_tokens: 300
//         })
          
//         data = await response.data

//         console.log(data.choices[0])


//     }
//     catch (error){
//         console.log(error)
//     }
// }


const { ImageAnalysisClient } = require('@azure-rest/ai-vision-image-analysis');
const createClient = require('@azure-rest/ai-vision-image-analysis').default;
const { AzureKeyCredential } = require('@azure/core-auth');

const endpoint = "https://imagerecon.cognitiveservices.azure.com/";
const key = "be05d2274dc84f22951c8bcd8e4835b6";

const credential = new AzureKeyCredential(key);
const client = createClient(endpoint, credential);

const features = [
    'denseCaptions',
    'Caption',
    'Read'
];

const imageRecognition =  async (req,res) => {

    const { url } = req.body

    const result = await client.path('/imageanalysis:analyze').post({
        body: {
            url: url
        },
        queryParameters: {
            features: features
        },
        contentType: 'application/json'
    });

    const iaResult = await result.body;

    if (iaResult.captionResult) {
        console.log(`Caption: ${iaResult.captionResult.text} (confidence: ${iaResult.captionResult.confidence})`);
    }
    if (iaResult.readResult) {
        iaResult.readResult.blocks.forEach(block => console.log(`Text Block: ${JSON.stringify(block)}`));
    }

    res.status(200).json({
        success: true,
        data: iaResult
    })
}




module.exports = { imageGeneration, imageRecognition }