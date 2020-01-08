require("dotenv").config();
import mongoose from "mongoose";
import UserModel from "./models/User";
import PatientModel, { IPatient } from "./models/Patient";
import DoctorModel, { IDoctor } from "./models/Doctor";
import dbConnection from "./models/dbConnection";

export const doctorIdMock = new mongoose.Types.ObjectId().toHexString();
export const patientIdMock = new mongoose.Types.ObjectId().toHexString();
export let patientToken: string;

export function connectTestsDatabase() {
  return dbConnection;
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
