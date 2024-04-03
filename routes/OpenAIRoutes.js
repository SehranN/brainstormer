const express = require('express')
const { imageGeneration, imageRecognition } = require('../controllers/OpenAIController')
const router = express.Router()

router.post('/imageGen', imageGeneration)
router.post('/imageRecognition', imageRecognition)

module.exports = router