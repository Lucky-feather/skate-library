import { Router } from 'express'
import { isLoggedIn } from '../middleware/middleware.js'
import * as profilesCtrl from '../controllers/profiles.js'

const router = Router()

router.get('/', profilesCtrl.index)
router.get('/', isLoggedIn, profilesCtrl.index)
router.get('/:id', isLoggedIn, profilesCtrl.show)
router.post('/:id/skates', profilesCtrl.createSkates)
router.delete('/skates/:id', profilesCtrl.deleteSkates)
router.post('/:id/unlocked',profilesCtrl.addUnlocked)

export {
  router
}
