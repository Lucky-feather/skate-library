import { Router } from 'express'

const router = Router()

import * as tricksCtrl from '../controllers/tricks.js'

router.get('/', tricksCtrl.index)

router.get('/new', tricksCtrl.new)

router.post('/', tricksCtrl.create)

export {
  router
}