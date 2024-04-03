const express = require('express')
const { getWords, saveWords, getWordsByDomain, getProject, saveProject, getImage, saveImage } = require('../controllers/projectControllers')
const router = express.Router()

router.post('/saveWords', saveWords)
router.get('/getWords/:id', getWords)
router.get('/getWordsByDomain/:id', getWordsByDomain)
router.post('/saveProject', saveProject)
router.get('/getProject', getProject)
router.post('/saveImage', saveImage)
router.get('/getImage', getImage)

module.exports = router