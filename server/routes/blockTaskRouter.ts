const Router = require('express')
const router = new Router()
const blockTaskController = require('../controllers/blockTaskController')
const checkRole = require('../middleware/CheckRoleMiddleware')

router.post('/',checkRole("ADMIN TEACHER"),blockTaskController.create)
router.get('/all',blockTaskController.getAll)
router.get('/for-class',blockTaskController.getForClass)
router.get('/foreign',blockTaskController.getForeignBlockTask)
router.get('/for-id/:id',blockTaskController.getBlockTaskForId)
router.get('/destroy-for-id/:id',blockTaskController.destroyBlockTaskForId)

module .exports = router
export{}