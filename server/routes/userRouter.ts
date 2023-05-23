const Router = require('express')
const router = new Router()
const authMiddleware = require('../middleware/authMiddleware')
const userController = require('../controllers/userController')
const checkRole = require('../middleware/CheckRoleMiddleware')

router.post('/registration',userController.registration)
router.post('/login',userController.login)
router.get('/auth',authMiddleware,userController.check)
router.get('/for-id/:id',checkRole("ADMIN TEACHER"),userController.getUserForId)
router.get('/delete/:id',checkRole("ADMIN"),userController.deleteUser)

module .exports = router
export{}