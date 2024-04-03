const path = require('path')
// const { urlencoded } = require('express')
const express = require('express')
var cors = require('cors')
const port = 3000


const app = express()

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended: false}))

// Set for static pages
app.use(express.static(path.join(__dirname, 'public')))


app.use('/openai', require('./routes/OpenAIRoutes'))
app.use('/nltk', require('./routes/wordGenRoutes'))
app.use('/projectList', require('./routes/projectRoutes'))



app.listen(port, () => console.log("server has started at port " + port))