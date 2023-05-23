const Router = require('express')
const router = new Router()
const schoolController = require("../controllers/schoolController")
const checkRole = require('../middleware/CheckRoleMiddleware')

router.post('/',schoolController.create)
router.get('/',schoolController.getAll)
router.get('/:id',schoolController.getForId)

module .exports = router
export{}