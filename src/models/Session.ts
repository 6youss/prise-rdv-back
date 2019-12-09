import mongoose, { Schema, Document } from "mongoose";

export interface ISession extends Document {
  patient: Schema.Types.ObjectId;
  doctor: Schema.Types.ObjectId;
  date: Date;
}

const SessionSchema = new Schema({
  patient: { type: Schema.Types.ObjectId, ref: "Patient" },
  doctor: { type: Schema.Types.ObjectId, ref: "Doctor" },
  date: Date
});

const Session = mongoose.model<ISession>("Session", SessionSchema);

export default Session;
