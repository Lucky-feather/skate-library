import { Profile } from '../models/profile.js'

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
    })
  })
  .catch(err => {
    if (err) return next(err)
  })
}

function show(req, res) {
  Profile.findById(req.params.id)
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

export {
  index,
  show
}