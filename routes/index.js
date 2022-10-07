import { Router } from 'express'
const router = new Router()
router.get('/', function(req, res) {
  res.render('index', { title: '' })
})

export {
  router
}
