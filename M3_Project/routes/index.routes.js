const router = require('express').Router()

router.get('/', (req, res) => {
  res.json('All good in here')
})

const eventsRouter = require('./events.routes')
const commentsRouter = require('./comments.routes')
router.use('/events', eventsRouter)
router.use('/:eventId/comments', commentsRouter)

module.exports = router
