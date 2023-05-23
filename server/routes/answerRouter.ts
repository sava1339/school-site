const Router = require('express')
const router = new Router()
const answerController = require('../controllers/answerController')

router.post('/',answerController.create)
router.get('/',answerController.getAll)
router.get('/:id',answerController.getOne)
router.get('/read/:id',answerController.readForId)
router.get('/get-answers/:id',answerController.getAnswersForId)
router.get('/get-answer/:id',answerController.getAnswerForId)
router.post('/post-check',answerController.postData)

module .exports = router
export{}