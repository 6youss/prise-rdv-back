import mongoose, { Schema, Document } from "mongoose";

export interface IPatient extends Document {
  _id: Schema.Types.ObjectId;
  firstName: string;
  lastName: string;
}

const PatientSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, ref: "User" },
  firstName: String,
  lastName: String
});

const Patient = mongoose.model<IPatient>("Patient", PatientSchema);

export default Patient;
