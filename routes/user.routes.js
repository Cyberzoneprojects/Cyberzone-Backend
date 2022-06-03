const router = require('express').Router()
const userController = require('../controllers/user.controller')
const isAuthenticated = require('../auth')
const { userValidation } = require('../validations/user.validation')

module.exports = () =>{
    router.post("/register", userValidation, userController.createUser)
    router.post("/login", userController.login)
    router.get("/", userController.getUsers)
    router.get("/:id", isAuthenticated,userController.getUser)
    router.put("/:id/update", userController.updateUser)
    router.delete("/:id/remove", userController.removeUser)

    router.put("/subscribe", userController.subscribe)
    return router
}