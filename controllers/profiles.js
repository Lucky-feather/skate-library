import { Profile } from '../models/profile.js'
import { Trick } from '../models/trick.js'

function index(req, res) {
  // Make the query object to use with Profile.find based on
  // whether the user has submitted the search form or not
  let modelQuery = req.query.name
    ? { name: new RegExp(req.query.name, 'i') }
    : {}
  // Sorting by name
  Profile.find(modelQuery)
  .sort("name")
  .then(profiles => {
    // Passing profiles and name, for use in the EJS
    res.render("profiles/index", { 
      profiles, 
      name: req.query.name,
      title: `profiles`,
    })
  })
  .catch(err => {
    if (err) return next(err)
  })
}

function show(req, res) {
  console.log(req.user)
  Profile.findById(req.params.id)
  .populate("unlocked")
  .then(profile => {
    console.log(profile)
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

  console.log(req.params, 'params', req.body, 'body')
  Profile.findById(req.params.id)
  .then(profile => {
    console.log(profile)
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