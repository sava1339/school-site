const Router = require('express')
const router = new Router()
const lessonController = require('../controllers/lessonController')
const checkRole = require('../middleware/CheckRoleMiddleware')

router.post('/',checkRole("ADMIN"),lessonController.create)
router.get('/',lessonController.getAll)
router.get('/:id',lessonController.getForId)
router.get('/for-lesson/:name',lessonController.getForLesson)

module .exports = router
export{}