import supertest from "supertest";
import app from "../../server";

const request = supertest(app);

import {
  clearTestsDatabase,
  addDefaultUsers,
  connectTestsDatabase,
  patientIdMock,
  doctorIdMock
} from "../../setupTests";
import UserModel from "../../models/User";

beforeAll(async () => {
  await connectTestsDatabase();
  await clearTestsDatabase();
  await addDefaultUsers();
});

describe("Session controller", () => {
  it("gets patientId", async () => {
    const patient = await UserModel.findById(patientIdMock);
    expect(patient).not.toBe(undefined);
  });

  it("gets doctorId", async () => {
    const doctor = await UserModel.findById(doctorIdMock);
    expect(doctor).not.toBe(undefined);
  });

  it("adds session with valid data", async () => {
    const res = await request.post("/api/session").send({
      patientId: patientIdMock,
      doctorId: doctorIdMock,
      date: "1/1/2020"
    });
    expect(res.status).toEqual(201);
    expect(res.body).toHaveProperty("session");
  });
});
