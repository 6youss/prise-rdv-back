import SessionController from "../SessionController";
import httpMocks from "node-mocks-http";
import { clearTestsDatabase, initializeData, initializeTestsDatabase } from "../../setupTests";
import UserModel, { IUser } from "../../models/User";

beforeAll(async () => {
  await initializeTestsDatabase();
  await initializeData();
});

afterAll(() => {
  return clearTestsDatabase();
});

describe("Session controller", () => {
  let patientId, doctorId;

  it("gets created patient", async () => {
    const patient = await UserModel.findOne({ "userType.value": "doctor" });
    expect(patient).not.toBe(undefined);
    patientId = patient._id;
  });

  it("adds session", () => {
    const bodyMock = JSON.parse(`{
      "patientId": 1,
      "doctorId": 1,
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
