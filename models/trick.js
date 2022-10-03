import mongoose from 'mongoose'

const Schema = mongoose.Schema

const trickSchema = new Schema({
  name: String,
  description: String,
  owner: { type: Schema.Types.ObjectId, ref: "Profile"}
}, {
  timestamps: true
})

const Trick = mongoose.model('Trick', trickSchema)

export {
  Trick
}