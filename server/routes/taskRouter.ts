const Router = require('express')
const router = new Router()
const taskController = require('../controllers/taskController')

router.post('/',taskController.create)
router.get('/',taskController.getAll)
router.get('/:id',taskController.getForId)
router.get('/question/:id',taskController.getForOneId)
router.get('/destroy-for-id/:id',taskController.destroyTaskForId)

module .exports = router
export{}