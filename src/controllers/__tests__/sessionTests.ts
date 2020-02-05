import {
  defaultPatientIdMock,
  defaultDoctorIdMock,
  defaultUsers,
  generateNewId,
  generateNewDoctor
} from "../../utils/testUtils";
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

  describe("test isSessionAvailable function", () => {
    test("should be unavailable session with invalid params", async () => {
      const newSessionDate = new Date();
      expect(
        await isSessionAvailable(defaultPatientIdMock + "sdqd", defaultDoctorIdMock + "sqdqsd", newSessionDate)
      ).toBe(false);
      expect(await isSessionAvailable(undefined, undefined, undefined)).toBe(false);
    });
    test("should be available session", async () => {
      const available = await isSessionAvailable(defaultPatientIdMock, defaultDoctorIdMock, new Date());
      expect(available).toBe(true);
    });
    test("should be unavailable session", async () => {
      //create session with specific date
      const existingSessionDate = new Date();
      await Session.create({
        patient: defaultPatientIdMock,
        doctor: defaultDoctorIdMock,
        date: existingSessionDate
      });
      const newSessionDate = new Date(existingSessionDate.getTime() - 10 * 60 * 1000);
      const available = await isSessionAvailable(defaultPatientIdMock, defaultDoctorIdMock, newSessionDate);
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
          patientId: defaultPatientIdMock,
          doctorId: defaultDoctorIdMock,
          date: availableSessionDate
        });
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty("session");
    });
  });

  describe("get the doctor sessions", () => {
    test("should get doctor sessions with valid existing doctorId", async () => {
      const res = await request.get(`/api/sessions/doctor/${defaultUsers.doctor._id}`);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("sessions");
      expect(res.body.sessions).toBeInstanceOf(Array);
    });
    test("should return 204 if doctor doesn't have any sessions", async () => {
      const doctor = await generateNewDoctor(undefined);
      const res = await request.get(`/api/sessions/doctor/${doctor._id}`);
      expect(res.status).toBe(204);
    });

    test("should return 404 if doctor doesn't exist", async () => {
      const res = await request.get(`/api/sessions/doctor/${generateNewId()}`);
      expect(res.status).toBe(404);
    });

    test("should send 412 status with invalid id format", async () => {
      const invalidIdFormat = "invalidIdFormat";
      const res = await request.get(`/api/sessions/doctor/${invalidIdFormat}`);
      expect(res.status).toBe(412);
    });
  });
};
