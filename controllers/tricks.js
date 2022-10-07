import { Trick } from "../models/trick.js"

function index(req, res) {
  console.log('SKATE 🛼')
  Trick.find({})
  .then(tricks => { 
    res.render('tricks/index', { 
      tricks,
      title: 'Trick Library'
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function newTrick(req, res) {
  res.render('tricks/new', { 
    title: 'Add a Trick'
  })
}

function create(req, res) {
  req.body.owner = req.user.profile._id
  if (req.body.description === '') {
    console.log('NOPE')
    return
  }
  Trick.create(req.body)
    .then(trick => {
    res.redirect('/tricks')
    console.log(Trick)
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function show(req, res) {
  Trick.findById(req.params.id)
  .populate('owner')
  .then(trick => {
    res.render('tricks/show', {
      trick,
      title: trick.name
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function deleteTrick(req, res) {
  Trick.findByIdAndDelete(req.params.id)
  .then (deletedTrick => {
    res.redirect('/tricks')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function edit(req, res) {
  Trick.findById(req.params.id)
  .then(trick => {
    res.render('tricks/edit', {
      trick,
      title: 'Edit My Trick'
    })
  })
}

function update(req, res) {
  Trick.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then (trick => {
    res.redirect(`/tricks/${trick._id}`)
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}


export {
  index,
  newTrick as new,
  create,
  show,
  deleteTrick as delete,
  edit,
  update,
}