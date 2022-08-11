const router = require('express').Router()


const modCtrl = require('../controllers/serv.controller')
module.exports = ()=>{
    router.post('/save', modCtrl.saveServ)
    router.get('/getservs', modCtrl.fetchServs)
    router.get('/getserv/:id', modCtrl.fetchServsData)
    router.delete('/delete/:id', modCtrl.deleteServ)
    router.put('/update/:id', modCtrl.updateServ)
    return router;
}
