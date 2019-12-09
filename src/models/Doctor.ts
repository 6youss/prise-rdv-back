import mongoose, { Schema, Document } from "mongoose";

export interface IDoctor extends Document {
  _id: Schema.Types.ObjectId;
  firstName: string;
  lastName: string;
  holidays: [Date];
}

const DoctorSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, ref: "User" },
  firstName: String,
  lastName: String,
  holidays: [Date]
});

const Doctor = mongoose.model<IDoctor>("Doctor", DoctorSchema);

export default Doctor;
