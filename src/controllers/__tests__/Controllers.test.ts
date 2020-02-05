import { doctorTests } from "./doctorTests";
import { sessionTests } from "./sessionTests";
import {
  closeTestsDatabaseConnection,
  connectTestsDatabase,
  clearTestsDatabase,
  addDefaultUsers,
  defaultUsers
} from "../../utils/testUtils";
import app, { server } from "../../server";
import supertest from "supertest";
const request = supertest(app);

beforeAll(async () => {
  await connectTestsDatabase();
  await clearTestsDatabase();
  await addDefaultUsers();
  expect(defaultUsers).not.toBe(undefined);
});

describe("doctor controller", doctorTests(request));
describe("session controller", sessionTests(request));

afterAll(async done => {
  (await server).close(done);
  await closeTestsDatabaseConnection();
});
