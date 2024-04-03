const { spawn } = require('child_process')
const pool = require('./db');



const wordGeneration = async (req,res) => {
    try {

        const { array } = req.body
        console.log(array, "this is the array")
        const pythonProcess = spawn('python3', ['wordGen/nlk.py','wordFinder', array]);
       
        let dataFromPython = ''

        pythonProcess.stdout.on('data', (data) => {
            dataFromPython += data;    
        });

        pythonProcess.stderr.on('data', (data) => {
            console.log(`Error from Python: ${data}`)  
        });

        pythonProcess.on('close', (code) => {
            console.log(`Python process exited with code ${code}`);
            console.log(`Data from Python: ${dataFromPython}`);

            const pythonArray = JSON.parse(JSON.stringify(dataFromPython));      
            res.send({ data: pythonArray });
            
        }); 
        
    } 
    catch (error) {
        
        res.status(400).json({
            success: false,
            error: "There was en error"
        })
        
    }
}

const wordMeaning = async (req,res) => {
    try {

        const { array } = req.body
        console.log(array, "this is the array")
        const pythonProcess = spawn('python3', ['wordGen/nlk.py','meaning', array]);
       
        let dataFromPython = ''

        pythonProcess.stdout.on('data', (data) => {
            dataFromPython += data;    
        });

        pythonProcess.stderr.on('data', (data) => {
            console.log(`Error from Python: ${data}`)  
        });

        pythonProcess.on('close', (code) => {
            console.log(`Python process exited with code ${code}`);
            console.log(`Data from Python: ${dataFromPython}`);

            const pythonArray = JSON.parse(JSON.stringify(dataFromPython));      
            res.send({ data: pythonArray });
            
        }); 
        
    } 
    catch (error) {
        
        res.status(400).json({
            success: false,
            error: "There was en error"
        })
        
    }
}

const wordRearranger = async (req,res) => {
    try {

        const { words } = req.body
        const pythonProcess = spawn('python3', ['wordGen/rearranger.py','rearrangment', words]);
        let dataFromPython = ''

        pythonProcess.stdout.on('data', (data) => {
            dataFromPython += data;  
        });

        pythonProcess.stderr.on('data', (data) => {
            console.log(`Error from Python: ${data}`)  
        });

        pythonProcess.on('close', (code) => {
            console.log(`Python process exited with code ${code}`);
            console.log(`Data from Python: ${dataFromPython}`);
            sentence = dataFromPython  
            res.status(200).json({
                success: true,
                data: sentence
            })
        }); 

        
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


module.exports = { wordGeneration, wordMeaning, wordRearranger }