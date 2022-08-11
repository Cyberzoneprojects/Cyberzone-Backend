const router = require('express').Router()
const userController = require('../controllers/user.controller')
const authController = require('../controllers/auth.controller')
const isAuthenticated = require('../auth')
const { userValidation, validateToken } = require('../validations/user.validation')

module.exports = () =>{
    router.post("/register",  userController.createUser)
    router.post("/login", authController.login)
    router.post("/token", validateToken, authController.token)
    router.post("/request-reset-password", userController.requestResetPassword)
    router.post("/reset-password", userController.resetPassword)

    router.get("/", userController.getUsers)
    router.get("/:id", isAuthenticated,userController.getUser)
    router.put("/:id/update", userController.updateUser)
    router.put("/:id/updates", userController.updateUsers)
    router.delete("/:id/remove", userController.removeUser)

    router.put("/subscribe", userController.subscribe)
    return router
}