const router = require('express').Router()


const modCtrl = require('../controllers/module.controller')
module.exports = ()=>{
    router.post('/module', modCtrl.saveModule)
    router.get('/', modCtrl.fetchModules)
    router.delete('/:id', modCtrl.deleteModul)
    router.get('/module:id', modCtrl.fetchModule)
    router.get('/servModule/:id', modCtrl.fetchModuleOfService)
    router.put('/module/:id', modCtrl.updateModule)
    return router;
}
