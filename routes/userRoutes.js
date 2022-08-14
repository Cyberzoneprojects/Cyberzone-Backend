const express = require('express')
const { resetPassword } = require('../controllers/user.controller')
const router = express.Router()
const {
  registerUser,
  loginUser,
  getMe,
  updateUser,
  getUsers,
  getAdmin,
  sendMail,
  resetMail,
  resetUserPassword,
  removeUser
} = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/admin', getAdmin)
router.get('/', getUsers)
router.post('/mail', sendMail)
router.put('/:id/update', updateUser)
router.post("/request-mail", resetMail);
router.post('/:userId/:token', resetUserPassword)
router.delete('/:id/delete', removeUser)

module.exports = router
