const router = require('express').Router()
const exerciseController = require('../controllers/exercise.controller')

module.exports = () =>{
    router.post("/create", exerciseController.createExercise)
    router.get("/", exerciseController.getExercises)
    router.get("/:id", exerciseController.getExercise)
    router.put("/:id/update", exerciseController.updateExercise)
    router.delete("/:id/remove", exerciseController.removeExercise)
    return router
}