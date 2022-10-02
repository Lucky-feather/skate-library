import { Router } from 'express'
import * as profilesCtrl from '../controllers/profiles.js'

const router = Router()

// GET /profiles
router.get('/', profilesCtrl.index)

// POST /facts
// We will already have access to the logged in profile on
// the server, therefore do not use: /profiles/:id/facts
//router.post('/facts', isLoggedIn, profilesCtrl.createFact)

// DELETE /facts/:id
//router.delete('/facts/:id', profilesCtrl.deleteFact)

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next()
  res.redirect('/profiles')
}

export {
  router
}
