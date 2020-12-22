const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const prescriptionSchema = new Schema({
  did: {
    type: String,
    required: true
  },
  cid: {
    type: String,
    required: true
  },
  pid: {
    type: String,
    required: true
  },
  medicines: [
    {
      name: {
        type: String,
        required: true
      },
      dose: {
        type: String,
        required: true
      },
      instruction: {
        type: String
      },
      time: {
        type: String,
        default: "After"
      },
      duration: {
        type: Number,
        required: true
      }
    }
  ],
  tests: [
    {
      name: {
        type: String,
        required: true
      },
      price: {
        type: Number
      }
    }
  ],
  advices: [
    {
      name: {
        type: String,
        required: true
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Prescription = mongoose.model(
  "prescriptions",
  prescriptionSchema
);
