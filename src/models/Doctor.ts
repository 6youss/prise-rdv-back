import mongoose, { Schema, Document } from "mongoose";

export interface IDoctor extends Document {
  firstName: string;
  lastName: string;
  holidays: [Date];
}

const DoctorSchema = new Schema({
  firstName: String,
  lastName: String,
  holidays: [Date]
});

const Doctor = mongoose.model<IDoctor>("Doctor", DoctorSchema, "doctor");

export default Doctor;
