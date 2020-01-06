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
import Session from "../../models/Session";

beforeAll(async () => {
  await connectTestsDatabase();
  await clearTestsDatabase();
  await addDefaultUsers();
});

describe("Session controller", () => {
  it("check for session availability", async () => {});

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
