import mongoose, { Schema, Document } from "mongoose";

export interface IPatient extends Document {
  firstName: string;
  lastName: string;
}

const PatientSchema = new Schema({
  firstName: String,
  lastName: String
});

const Patient = mongoose.model<IPatient>("Patient", PatientSchema, "patient");

export default Patient;
