require("dotenv").config();
import mongoose from "mongoose";
import UserModel, { IUser } from "./models/User";
import PatientModel, { IPatient } from "./models/Patient";
import DoctorModel, { IDoctor } from "./models/Doctor";

export function initializeTestsDatabase() {
  return mongoose.connect(process.env.MONGODB_URI_LOCAL_TEST, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
}

export async function initializeData() {
  const doctor = await DoctorModel.create({
    firstName: "doctor",
    lastName: "doctor",
    holidays: [new Date()]
  } as IDoctor);
  await UserModel.create({
    username: "doctor",
    password: "0000",
    userType: { value: "doctor", targetId: doctor._id }
  } as IUser);

  const patient = await PatientModel.create({ firstName: "patient", lastName: "patient" } as IPatient);
  await UserModel.create({
    username: "patient",
    password: "0000",
    userType: { value: "patient", targetId: patient._id }
  } as IUser);
}

export function clearTestsDatabase() {
  // console.log("@TODO clear DB");
  return mongoose.connection.db.dropDatabase();
}
