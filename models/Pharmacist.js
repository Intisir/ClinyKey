const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pharmacistSchema = new Schema({
  pid: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  otime: {
    type: String,
    required: true
  },
  ctime: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  }
});

module.exports = Pharmacist = mongoose.model(
  "pharmacist-profiles",
  pharmacistSchema
);
