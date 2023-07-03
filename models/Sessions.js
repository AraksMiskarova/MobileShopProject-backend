const mongoose = requir("mongoose");
const Schema = mongoose.Schema;

const SessionsSchema = new Schema(
  {
    sid: {
      type: String,
      required: true,
    },
  },
  { strict: false }
);

module.exports = Partner = mongoose.module("sessions", SessionsSchema);
