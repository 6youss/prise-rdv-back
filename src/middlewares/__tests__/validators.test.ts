import { validateSignUpBody, validateSessionBody } from "../validators";
import { Request, Response, NextFunction } from "express";
import httpMocks from "node-mocks-http";
import { defaultPatientIdMock, defaultDoctorIdMock } from "../../utils/testUtils";

function testValidator(
  validator: (req: Request, res: Response, next: NextFunction) => {},
  body: any,
  shouldBeValid: boolean
) {
  const nextMock = jest.fn(() => {});
  const req = httpMocks.createRequest();
  req.body = body;

  const res = httpMocks.createResponse();

  validator(req, res, nextMock);

  if (shouldBeValid) expect(nextMock).toBeCalledTimes(1);
  else expect(nextMock).toBeCalledTimes(0);
}

describe("Signup validation middleware", () => {
  it("with valid body", () => {
    testValidator(
      validateSignUpBody,
      {
        username: "admin",
        password: "admins",
        confirmPassword: "admins",
        userType: "patient",
        profile: {
          firstName: "test",
          lastName: "test"
        }
      },
      true
    );
  });

  it("with invalid body", () => {
    testValidator(
      validateSignUpBody,
      {
        username: "admin",
        password: "admin",
        confirmPassword: "admin",
        userType: "patient"
      },
      false
    );
  });

  it("without sending body", () => {
    testValidator(validateSignUpBody, undefined, false);
  });
});

describe("Session validation middleware", () => {
  it("with valid body", () => {
    testValidator(
      validateSessionBody,
      {
        patientId: defaultPatientIdMock,
        doctorId: defaultDoctorIdMock,
        date: new Date()
      },
      true
    );
  });

  it("with invalid body", () => {
    testValidator(
      validateSessionBody,
      {
        patientId: defaultPatientIdMock,
        doctorId: defaultDoctorIdMock
      },
      false
    );
  });

  it("without sending body", () => {
    testValidator(validateSessionBody, undefined, false);
  });
});
