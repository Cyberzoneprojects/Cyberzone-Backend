const router = require('express').Router()


const struct1Ctrl = require('../controllers/structure1.controller')
module.exports = ()=>{
    router.post('/str1', struct1Ctrl.saveStructure1Data)
    router.get('/str1', struct1Ctrl.fetchStructure1s)
    router.delete('/str1/:id', struct1Ctrl.deleteStructure)
    router.get('/str1/:id', struct1Ctrl.fetchUnitStruct1)
    router.put('/str1/:id', struct1Ctrl.updateStructure)
    return router;
}
