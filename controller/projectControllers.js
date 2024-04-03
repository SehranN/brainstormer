const pool = require('./db');
const { spawn } = require('child_process')


const getWords = async (req,res) => {
    const project = req.params.id;
    try {

        pool.query('SELECT * FROM ideas WHERE projectName = ?', [project], (error, results) => {
            if (error) {
              return res.status(500).json({ error: 'Internal Server Error' });
            }
            console.log(results)
            return res.status(200).json(results);
          });  
    } 
    catch (error) {
        
        res.status(400).json({
            success: false,
            error: "There was en error"
        })
        
    }
}



const getWordsByDomain = async (req,res) => {
    const parameters = req.params.id;
    parameters = parameters.split(",")
    domain= parameters[0]
    project = parameters[1]
    try {

        pool.query('SELECT * FROM ideas WHERE projectName = ? AND searchDomain = ?', [project, domain], (error, results) => {
            if (error) {
              return res.status(500).json({ error: 'Internal Server Error' });
            }
            console.log(results)
            return res.status(200).json(results);
          });  
    } 
    catch (error) {
        
        res.status(400).json({
            success: false,
            error: "There was en error"
        })
        
    }
}


const saveWords = async (req,res) => {
    
    const vals = req.body
    console.log(vals , " this is the values")

    var searchDomain = ""
    for(let i = 0; i < vals.row[1].length; i ++){
        if (i == vals.row[1].length - 1) {
            searchDomain += vals.row[1][i]
        }
        else{
            searchDomain += vals.row[1][i] + ","
        }
        
    }
    const values = [vals.row[0],searchDomain,vals.row[2]]
    
    const query = 'INSERT INTO ideas(projectName, searchDomain, likedWords) VALUES (?)'
    try {
        
        pool.getConnection((err, connection) => {
            if (err) {
                console.error('MySQL connection error:', err);
                res.status(500).json({ success: false, error: err});
                return;
            }
    
            connection.query(query, [values], (queryErr, result) => {
                connection.release();
    
                if (queryErr) {
                    console.error('MySQL query error:', queryErr);
                    res.status(500).json({ success: false, error: queryErr.message });
                } else {
                    console.log('Array saved to the database');
                    res.json({ success: true });
                }
            });
        });
    } 
    catch (error) {
        
        res.status(400).json({
            success: false,
            error: "There was en error"
        })
        
    }
}

const saveProject = async (req,res) => {
    const { array } = req.body
    
    const values = [array[0],array[1]]
    console.log(values, " this is the values")
    const query = 'INSERT INTO projects(projectName, Date) VALUES (?)'
    try {
        
        pool.getConnection((err, connection) => {
            if (err) {
                console.error('MySQL connection error:', err);
                res.status(500).json({ success: false, error: err.message });
                return;
            }
    
            connection.query(query, [values], (queryErr, result) => {
                connection.release();
    
                if (queryErr) {
                    console.error('MySQL query error:', queryErr);
                    res.status(500).json({ success: false, error: queryErr.message });
                } else {
                    console.log('Array saved to the database');
                    res.json({ success: true });
                }
            });
        });


        
    
        
    } 
    catch (error) {
        
        res.status(400).json({
            success: false,
            error: "There was en error"
        })
        
    }
}

const getProject = async (req,res) => {
    try {

        pool.query('SELECT * FROM projects', (error, results) => {
            if (error) {
              return res.status(500).json({ error: error });
            }
            return res.status(200).json(results);
          });        
    } 
    catch (error) {
        
        res.status(400).json({
            success: false,
            error: "There was en error"
        })
        
    }
}

const getImage = async (req,res) => {
    const project = req.params.id;
    try {

        pool.query('SELECT * FROM ideaimage WHERE projectName = ?', [project], (error, results) => {
            if (error) {
              return res.status(500).json({ error: 'Internal Server Error' });
            }
            console.log(results)
            return res.status(200).json(results);
          });        
    } 
    catch (error) {
        
        res.status(400).json({
            success: false,
            error: "There was en error"
        })
        
    }
}

const saveImage = async (req,res) => {
    
    const vals = req.body
    console.log(vals , " this is the values")

    var searchDomain = ""
    for(let i = 0; i < vals.row[1].length; i ++){
        if (i == vals.row[1].length - 1) {
            searchDomain += vals.row[1][i]
        }
        else{
            searchDomain += vals.row[1][i] + ","
        }  
    }
    const values = [vals.row[0],searchDomain,vals.row[2]]
    
    const query = 'INSERT INTO ideaimage(projectName, searchDomain, imageLoc) VALUES (?)'
    try {
        
        pool.getConnection((err, connection) => {
            if (err) {
                console.error('MySQL connection error:', err);
                res.status(500).json({ success: false, error: err});
                return;
            }
    
            connection.query(query, [values], (queryErr, result) => {
                connection.release();
    
                if (queryErr) {
                    console.error('MySQL query error:', queryErr);
                    res.status(500).json({ success: false, error: queryErr.message });
                } else {
                    console.log('Array saved to the database');
                    res.json({ success: true });
                }
            });
        });
        
    } 
    catch (error) {
        
        res.status(400).json({
            success: false,
            error: "There was en error"
        })
        
    }
}




module.exports = { getWords, getWordsByDomain, saveWords, saveProject, getProject, saveImage, getImage }