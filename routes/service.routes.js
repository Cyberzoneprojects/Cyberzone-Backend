const router = require('express').Router()

const serviceController = require('../controllers/service.controller')
module.exports = () =>{
    router.post("/create", serviceController.createService)
    router.get("/", serviceController.getServices)
    router.get("/subscribed", serviceController.getSubscribedServices)
    router.get("/unsubscribed", serviceController.getunsubscribedServices)
    router.get("/:id", serviceController.getService)
    router.get("/user/:sid", serviceController.getUserService)
    router.put("/:id/update", serviceController.updateService)
    router.delete("/:id/remove", serviceController.removeService)
    return router
}