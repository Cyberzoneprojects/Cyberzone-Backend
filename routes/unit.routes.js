const router = require('express').Router()


const modCtrl = require('../controllers/unit.controller')
module.exports = ()=>{
    router.post('/unit', modCtrl.saveUnit)
    router.get('/unit', modCtrl.fetchUnits)
    router.delete('/unit/:id', modCtrl.deleteUnit)
    router.get('/unit/:id', modCtrl.fetchModuleUnit)
    router.get('/units/:id', modCtrl.fetchUnit)
    router.get('/unitsdata/:id', modCtrl.fetchUnitsData)
    router.put('/unit/:id', modCtrl.updateUnit)
    return router;
}
