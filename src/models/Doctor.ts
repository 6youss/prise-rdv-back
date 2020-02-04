import mongoose, { Schema, Document } from "mongoose";

export interface IDoctor extends Document {
  firstName: string;
  lastName: string;
  phone: number;
  address: string;
  holidays: [Date];
}

const DoctorSchema = new Schema({
  firstName: String,
  lastName: String,
  phone: { type: String, required: true, unique: true },
  address: String,
  holidays: [Date]
});

const Doctor = mongoose.model<IDoctor>("Doctor", DoctorSchema, "doctor");

export default Doctor;
