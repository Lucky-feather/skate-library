import { Router } from 'express'
import { isLoggedIn } from '../middleware/middleware.js'
import * as profilesCtrl from '../controllers/profiles.js'

const router = Router()

router.get('/', profilesCtrl.index)
router.get('/', isLoggedIn, profilesCtrl.index)
router.get('/:id', isLoggedIn, profilesCtrl.show)

// POST /facts
// We will already have access to the logged in profile on
// the server, therefore do not use: /profiles/:id/facts
//router.post('/facts', isLoggedIn, profilesCtrl.createFact)

// DELETE /facts/:id
//router.delete('/facts/:id', profilesCtrl.deleteFact)


export {
  router
}
