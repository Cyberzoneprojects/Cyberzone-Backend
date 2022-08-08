const router = require('express').Router()


const modCtrl = require('../controllers/answers.controller')
module.exports = ()=>{
    router.post('/answer', modCtrl.saveAnswers)
    // router.get('/answer', modCtrl.getAnswers)
    router.get('/answer/:id', modCtrl.getAnswers)
    router.delete('/:id', modCtrl.deleteQuestion)
    router.put('/answer/:id', modCtrl.updateQuestion)
    return router;
}
