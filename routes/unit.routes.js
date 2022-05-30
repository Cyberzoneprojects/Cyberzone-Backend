const router = require('express').Router()


const modCtrl = require('../controllers/unit.controller')
module.exports = ()=>{
    router.post('/unit', modCtrl.saveUnit)
    router.get('/unit', modCtrl.fetchUnits)
    router.delete('/unit/:id', modCtrl.deleteUnit)
    router.get('/unit/:id', modCtrl.fetchUnit)
    router.put('/unit/:id', modCtrl.updateUnit)
    return router;
}
