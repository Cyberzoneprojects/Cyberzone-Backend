const router = require('express').Router()


const modCtrl = require('../controllers/answers.controller')
module.exports = ()=>{
    router.post('/answer', modCtrl.saveAnswers)
    // router.get('/answer', modCtrl.getAnswers)
    router.get('/answer/:id', modCtrl.getAnswers)
    return router;
}
