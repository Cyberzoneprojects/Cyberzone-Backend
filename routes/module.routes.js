const router = require('express').Router()


const modCtrl = require('../controllers/module.controller')
module.exports = ()=>{
    router.post('/module', modCtrl.saveModule)
    router.get('/module', modCtrl.fetchModules)
    router.delete('/module/:id', modCtrl.deleteModul)
    router.get('/module/:id', modCtrl.fetchModule)
    router.put('/module/:id', modCtrl.updateModule)
    return router;
}
