const router = require('express').Router()
const exerciseController = require('../controllers/exercise.controller')
// const { validateCreateExercise } = require('../validations/exercise.validation')

module.exports = () =>{
    router.post("/exercise", exerciseController.createExercise)
    router.get("/exercises", exerciseController.getExercises)
    // router.get("/:id", exerciseController.getExercise)
    // router.put("/:id/update", exerciseController.updateExercise)
    // router.delete("/:id/remove", exerciseController.removeExercise)
    return router
}