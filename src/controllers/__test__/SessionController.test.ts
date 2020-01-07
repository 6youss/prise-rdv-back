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
// import Session from "../../models/Session";

beforeAll(async () => {
  process.env.NODE_ENV = "test";
  await connectTestsDatabase();
  await addDefaultUsers();
});

afterAll(async () => {
  await clearTestsDatabase();
});

describe("Session controller", () => {
  it("check for session availability", async () => {
    // Session.isSessionAvailable
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
