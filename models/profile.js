import mongoose from 'mongoose'

const Schema = mongoose.Schema


const skateSchema = new Schema({
  boots: String,
  wheels: String,
  other: String,
}, {
  timestamps: true
})

const profileSchema = new Schema({
  name: String,
  avatar: String,
  skates: [skateSchema],
  unlocked: [{ type: Schema.Types.ObjectId, ref: "Trick"}]
}, {
  timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)
const Skates = mongoose.model('Skates', skateSchema)

export {
  Profile,
  Skates,
}