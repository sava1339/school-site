const Router = require('express')
const router = new Router()
const classController = require('../controllers/classController')
const checkRole = require('../middleware/CheckRoleMiddleware')

router.post('/',checkRole("ADMIN"),classController.create)
router.get('/all',classController.getAll)
router.get('/for-school',classController.getForSchool)
router.get('/for-id/:id',classController.getForId)
router.get('/id-for-word-class/:word_class',classController.getClassIdForWordClass)

module .exports = router
export{}