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
      profiles: profiles, 
      name: req.query.name,
    })
  })
  .catch(err => {
    if (err) return next(err)
  })
}

export {
  index,
}