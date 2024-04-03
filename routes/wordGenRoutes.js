const express = require('express')
const { wordGeneration, wordMeaning, wordRearranger } = require('../controllers/wordGenController')
const router = express.Router()

router.post('/wordGen', wordGeneration)
router.post('/wordMeaning', wordMeaning)
router.post('/rearranger', wordRearranger)


module.exports = router