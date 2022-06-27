const router = require('express').Router()


const modCtrl = require('../controllers/unit.controller')
module.exports = ()=>{
    router.post('/', modCtrl.saveUnit)
    router.get('/', modCtrl.fetchUnits)
    router.delete('/:id', modCtrl.deleteUnit)
    router.get('/:id', modCtrl.moduleUnits)
    router.get('unit/:id', modCtrl.fetchUnit)
    router.put('/:id', modCtrl.updateUnit)
    return router;
}
