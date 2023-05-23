const Router = require('express')
export const router = new Router()
const schoolRouter = require('./schoolRouter')
const blockTaskRouter = require('./blockTaskRouter')
const classRouter = require('./classRouter')
const answerRouter = require('./answerRouter')
const taskRouter = require('./taskRouter')
const userRouter = require('./userRouter')
const lessonRouter = require('./lessonRouter')
const blockAnswersRouter = require('./blockAnswersRouter')

router.use('/school',schoolRouter)
router.use('/block-task',blockTaskRouter)
router.use('/class',classRouter)
router.use('/answer',answerRouter)
router.use('/lesson',lessonRouter)
router.use('/task',taskRouter)
router.use('/user',userRouter)
router.use('/block-answers',blockAnswersRouter)

module.exports = router
export{}