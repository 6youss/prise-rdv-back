import { validateSignUpBody } from "../validation";
import httpMocks from "node-mocks-http";

describe("signup validation middleware", () => {
  it("with valid body", () => {
    const nextMock = jest.fn(() => {});
    const bodyMock = JSON.parse(`{
      "username": "admin",
      "password": "admin",
      "confirmPassword": "admin",
      "userType": "patient",
      "profile": {
        "firstName":"test",
        "lastName":"test"
      }
    }`);
    const req = httpMocks.createRequest();
    req.body = bodyMock;
    const res = httpMocks.createResponse();
    validateSignUpBody(req, res, nextMock);
    expect(nextMock).toBeCalled();
  });

  it("with invalid body", () => {
    const nextMock = jest.fn(() => {});
    const bodyMock = JSON.parse(`{
      "username": "admin",
      "password": "admin",
      "confirmPassword": "admin",
      "userType": "patient"
    }`);
    const req = httpMocks.createRequest();
    req.body = bodyMock;
    const res = httpMocks.createResponse();
    validateSignUpBody(req, res, nextMock);
    expect(nextMock).toBeCalledTimes(0);
  });

  it("without sending body", () => {
    const nextMock = jest.fn(() => {});
    const req = httpMocks.createRequest();
    req.body = undefined;
    const res = httpMocks.createResponse();
    validateSignUpBody(req, res, nextMock);
    expect(nextMock).toBeCalledTimes(0);
  });
});
