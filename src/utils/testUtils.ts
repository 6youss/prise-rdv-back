import crypto from "crypto";
require("dotenv").config({ path: ".env.test" });
import mongoose from "mongoose";
import User, { IUser } from "../models/User";
import PatientModel, { IPatient } from "../models/Patient";
import DoctorModel, { IDoctor } from "../models/Doctor";
import dbConnection from "../models/dbConnection";

export const defaultDoctorIdMock = generateNewId();
export const defaultPatientIdMock = generateNewId();

export interface IDefaultUsers {
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
  const doctor = await generateNewDoctor({
    _id: defaultDoctorIdMock,
    firstName: "doctor",
    lastName: "doctor",
    phone: "0758081532",
    address: "03 Rue Taylor 75000",
    holidays: [new Date("01/05/2020")]
  } as IDoctor);

  const doctorUser = await User.create({
    username: "doctor",
    password: "0000",
    userType: { value: "doctor", targetId: defaultDoctorIdMock }
  });

  // Patient
  const patient = await generateNewPatient({
    _id: defaultPatientIdMock,
    firstName: "patient",
    lastName: "patient"
  } as IPatient);

  const patientUser = await User.create({
    username: "patient",
    password: "0000",
    userType: { value: "patient", targetId: defaultPatientIdMock }
  });

  defaultUsers = {
    doctor,
    doctorUser,
    patient,
    patientUser
  };
}

export async function generateNewDoctor(doctor: IDoctor | undefined): Promise<IDoctor> {
  if (!doctor) {
    return await DoctorModel.create({
      _id: generateNewId(),
      firstName: generateRandomString(8),
      lastName: generateRandomString(8),
      phone: generateRandomPhone(),
      address: generateRandomString(16),
      holidays: [new Date("01/05/2020")]
    } as IDoctor);
  }
  return await DoctorModel.create(doctor);
}

export function generateRandomString(length: number) {
  return crypto.randomBytes(length).toString("hex");
}
export function generateRandomPhone() {
  return (
    "0" +
    Math.random()
      .toString()
      .substring(10)
  );
}

export async function generateNewPatient(doctor: IPatient): Promise<IPatient> {
  return await PatientModel.create(doctor);
}

export function generateNewId(): string {
  return new mongoose.Types.ObjectId().toHexString();
}

export async function clearTestsDatabase() {
  await mongoose.connection.db.dropDatabase();
}
export async function closeTestsDatabaseConnection() {
  await mongoose.connection.close();
}
