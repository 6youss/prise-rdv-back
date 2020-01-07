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

import { isSessionAvailable } from "../SessionController";
import Session, { ISession } from "../../models/Session";

beforeAll(async () => {
  await connectTestsDatabase();
  await clearTestsDatabase();
  await addDefaultUsers();
});

afterAll(async () => {
  // await clearTestsDatabase();
});

describe("Session controller", () => {
  describe("check for session availability", () => {
    it("with available date", async () => {
      // const available = await isSessionAvailable(patientIdMock, doctorIdMock, new Date());
      // expect(available).toBe(true);
    });

    it("with unavailable date", async () => {
      const existingSessionDate = new Date();
      const newSessionDate = new Date(existingSessionDate.getTime() - 10 * 60 * 1000);
      //create session to try adding in the same time
      await Session.create({
        patient: patientIdMock,
        doctor: doctorIdMock,
        date: existingSessionDate
      });
      const available = await isSessionAvailable(patientIdMock, doctorIdMock, newSessionDate);
      expect(available).toBe(false);
    });
  });

  it("post session with valid data", async () => {
    // const res = await request.post("/api/session").send({
    //   patientId: patientIdMock,
    //   doctorId: doctorIdMock,
    //   date: "1/1/2020"
    // });
    // expect(res.status).toEqual(201);
    // expect(res.body).toHaveProperty("session");
  });
});
