require("dotenv").config();
import mongoose, { Schema } from "mongoose";
import UserModel, { IUser } from "./models/User";
import PatientModel, { IPatient } from "./models/Patient";
import DoctorModel, { IDoctor } from "./models/Doctor";

export const doctorIdMock = new mongoose.Types.ObjectId().toHexString();
export const patientIdMock = new mongoose.Types.ObjectId().toHexString();

export function connectTestsDatabase() {
  return mongoose.connect(process.env.MONGODB_URI_LOCAL_TEST, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
}

export async function addDefaultUsers() {
  //Doctor
  await DoctorModel.create({
    _id: doctorIdMock,
    firstName: "doctor",
    lastName: "doctor",
    holidays: [new Date()]
  } as IDoctor);

  await UserModel.create({
    username: "doctor",
    password: "0000",
    userType: { value: "doctor", targetId: doctorIdMock }
  });

  // Patient
  await PatientModel.create({
    _id: patientIdMock,
    firstName: "patient",
    lastName: "patient"
  } as IPatient);

  await UserModel.create({
    username: "patient",
    password: "0000",
    userType: { value: "patient", targetId: patientIdMock }
  });
}

export function clearTestsDatabase() {
  // console.log("@TODO clear DB");
  return mongoose.connection.db.dropDatabase();
}
