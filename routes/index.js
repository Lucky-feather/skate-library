import { Router } from 'express'
const router = new Router()
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: '' })
})

export {
  router
}
