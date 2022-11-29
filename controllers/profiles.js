import { Profile } from '../models/profile.js'

function index(req, res) {
  let modelQuery = req.query.name
  ? { name: new RegExp(req.query.name, 'i') }
  : {}
  Profile.find(modelQuery)
  .sort("name")
  .then(profiles => {
    res.render("profiles/index", { 
      profiles, 
      name: req.query.name,
      title: `profiles`,
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function show(req, res) {
  Profile.findById(req.params.id)
  .populate("unlocked")
  .then(profile => {
    const isSelf = profile._id.equals(req.user.profile._id)
    res.render('profiles/show', {
      title: `${profile.name}'s profile`,
      isSelf,
      profile,
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/profiles')
  })
}

function createSkates(req, res) {
  console.log(req.body)
  if (req.body === '') {
    console.log("no skates")
  }
  else {
  Profile.findById(req.user.profile._id)
  .then(profile => {
    profile.skates.push(req.body)
    profile.save()
    .then(()=> {
      res.redirect(`/profiles/${req.user.profile._id}`)
    })
  })

  .catch(err => {
    console.log(err)
    res.redirect(`/profiles/${req.user.profile._id}`)
  })
}
}

function deleteSkates(req, res) {
  Profile.findById(req.user.profile._id)
  .then(profile => {
    profile.skates.remove({_id: req.params.id})
    profile.save()
    .then(() => {
      res.redirect(`/profiles/${req.user.profile._id}`)
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect(`/profiles/${req.user.profile._id}`)
  })
}

function addUnlocked(req, res) {
  Profile.findById(req.params.id)
  .then(profile => {
    profile.unlocked.push(req.body.trickId) // <== push Obj Id
    profile.save().then( () => { res.redirect(`/profiles/${profile._id}`) })
  })
  .catch(err => {
    console.log(err)
    res.redirect(`/profiles/${req.user.profile._id}`)
  })
}



export {
  index,
  show,
  createSkates,
  deleteSkates,
  addUnlocked,
}