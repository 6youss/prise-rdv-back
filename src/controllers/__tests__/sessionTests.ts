import { patientIdMock, doctorIdMock } from "../../__tests__/setupTests";
import supertest from "supertest";
import Session, { isSessionAvailable } from "../../models/Session";

export const sessionTests = (request: supertest.SuperTest<supertest.Test>) => () => {
  let patientToken: string;
  beforeAll(async () => {
    const res = await request.post("/api/user/login").send({
      username: "patient",
      password: "0000"
    });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("accessToken");
    patientToken = res.body.accessToken;
  });

  describe("check for session availability", () => {
    test("should be unavailable session with invalid params", async () => {
      const newSessionDate = new Date();
      expect(await isSessionAvailable(patientIdMock + "sdqd", doctorIdMock + "sqdqsd", newSessionDate)).toBe(false);
      expect(await isSessionAvailable(undefined, undefined, undefined)).toBe(false);
    });
    test("should be available session", async () => {
      const available = await isSessionAvailable(patientIdMock, doctorIdMock, new Date());
      expect(available).toBe(true);
    });
    test("should be unavailable session", async () => {
      //create session with specific date
      const existingSessionDate = new Date();
      await Session.create({
        patient: patientIdMock,
        doctor: doctorIdMock,
        date: existingSessionDate
      });
      const newSessionDate = new Date(existingSessionDate.getTime() - 10 * 60 * 1000);
      const available = await isSessionAvailable(patientIdMock, doctorIdMock, newSessionDate);
      expect(available).toBe(false);
    });
  });

  describe("add session to server", () => {
    test("should add session with valid data", async () => {
      const availableSessionDate = new Date(new Date().getTime() + 60 * 60 * 1000); //current time + 60mn
      const res = await request
        .post("/api/sessions")
        .set("Authorization", "Bearer " + patientToken)
        .send({
          patientId: patientIdMock,
          doctorId: doctorIdMock,
          date: availableSessionDate
        });
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty("session");
    });
  });
};
