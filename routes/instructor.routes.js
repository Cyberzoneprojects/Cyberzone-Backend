const router = require('express').Router()
const instructorController = require('../controllers/instructor.controller')

module.exports = () =>{
    router.post("/register", instructorController.createInstructor)
    router.get("/", instructorController.getInstructor)
    router.get("/:id", instructorController.getInstructor)
    router.put("/:id/update", instructorController.updateInstructor)
    router.delete("/:id/remove", instructorController.removeInstructor)
    return router
}