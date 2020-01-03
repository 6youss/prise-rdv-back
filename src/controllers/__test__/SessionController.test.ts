import SessionController from "../SessionController";
import httpMocks from "node-mocks-http";
import {
  clearTestsDatabase,
  addDefaultUsers,
  initializeTestsDatabase,
  patientIdMock,
  doctorIdMock
} from "../../setupTests";
import UserModel, { IUser } from "../../models/User";

beforeAll(async () => {
  await initializeTestsDatabase();
  await addDefaultUsers();
});

afterAll(() => {
  return clearTestsDatabase();
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

  it("adds session", () => {
    const bodyMock = JSON.parse(`{
      "patientId": "${patientIdMock}",
      "doctorId": "${doctorIdMock}",
      "date": "1/1/2020"
    }`);

    const req = httpMocks.createRequest();
    req.body = bodyMock;
    const res = httpMocks.createResponse();
    const nextMock = jest.fn(() => {});
    const resStatusMock = jest.fn(res.sendStatus);
    SessionController.postSession(req, res, nextMock);

    expect(resStatusMock).toBeCalledWith(500);
  });
});
