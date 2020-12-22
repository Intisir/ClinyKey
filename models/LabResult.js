const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const labresultSchema = new Schema({
  presid: {
    type: String,
    required: true
  },
  pid: {
    type: String,
    required: true
  },
  after: {
    type: Number
  },
  did: {
    type: String,
    required: true
  },
  diagid: {
    type: String,
    required: true
  },
  collected: {
    type: Boolean
  },
  published: {
    type: Boolean,
    default: false
  },
  results: [
    {
      id: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      result: [
        {
          name: {
            type: String
          },
          result: {
            type: String
          },
          nrange: {
            type: String
          }
        }
      ]
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = LabResult = mongoose.model("test-results", labresultSchema);
