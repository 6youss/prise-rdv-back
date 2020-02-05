require("dotenv").config();
import mongoose from "mongoose";
import UserModel, { IUser } from "./models/User";
import PatientModel, { IPatient } from "./models/Patient";
import DoctorModel, { IDoctor } from "./models/Doctor";
import dbConnection from "./models/dbConnection";

export const doctorIdMock = new mongoose.Types.ObjectId().toHexString();
export const patientIdMock = new mongoose.Types.ObjectId().toHexString();

interface IDefaultUsers {
  doctor: IDoctor;
  doctorUser: IUser;
  patient: IPatient;
  patientUser: IUser;
}
export let defaultUsers: IDefaultUsers;

export function connectTestsDatabase() {
  return dbConnection;
}

export async function addDefaultUsers() {
  //Doctor
  const doctor = await DoctorModel.create({
    _id: doctorIdMock,
    firstName: "doctor",
    lastName: "doctor",
    phone: "0758081532",
    address: "03 Rue Taylor 75000",
    holidays: [new Date("01/05/2020")]
  } as IDoctor);

  const doctorUser = await UserModel.create({
    username: "doctor",
    password: "0000",
    userType: { value: "doctor", targetId: doctorIdMock }
  });

  // Patient
  const patient = await PatientModel.create({
    _id: patientIdMock,
    firstName: "patient",
    lastName: "patient"
  } as IPatient);

  const patientUser = await UserModel.create({
    username: "patient",
    password: "0000",
    userType: { value: "patient", targetId: patientIdMock }
  });
  defaultUsers = {
    doctor,
    doctorUser,
    patient,
    patientUser
  };
}

export async function clearTestsDatabase() {
  await mongoose.connection.db.dropDatabase();
}
export async function closeTestsDatabaseConnection() {
  await mongoose.connection.close();
}
