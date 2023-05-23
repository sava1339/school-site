const Router = require('express')
const router = new Router()
const blockAnswerController = require('../controllers/blockAnswersController')

router.post('/',blockAnswerController.create)
router.get('/all/:page:limit',blockAnswerController.getAll)
router.get('/check/:userId',blockAnswerController.checkOne)
router.get('/for-id/',blockAnswerController.getForId)
router.get('/:id',blockAnswerController.getForIdAll)
router.post('/post-points',blockAnswerController.postPoints)

module .exports = router
export{}