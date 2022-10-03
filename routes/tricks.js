import { Router } from 'express'
import * as tricksCtrl from '../controllers/tricks.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/', tricksCtrl.index)
router.get('/new', tricksCtrl.new)
router.get('/:id', tricksCtrl.show)
router.get('/:id/edit', tricksCtrl.edit)
router.post('/', tricksCtrl.create)
router.post('/:id/unlocked', tricksCtrl.addUnlocked)
router.put('/:id', tricksCtrl.update)
router.delete('/:id', tricksCtrl.delete)


export {
  router
}