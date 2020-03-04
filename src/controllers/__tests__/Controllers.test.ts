import {doctorTests} from './doctorTests';
import {sessionTests} from './sessionTests';
import {deviceTests} from './deviceTests';
import {
  closeTestsDatabaseConnection,
  connectTestsDatabase,
  clearTestsDatabase,
  addDefaultUsers,
  defaultUsers,
} from '../../utils/testUtils';
import app from '../../app';
import supertest from 'supertest';
const request = supertest(app);

beforeAll(async () => {
  await connectTestsDatabase();
  await clearTestsDatabase();
  await addDefaultUsers();
  expect(defaultUsers).not.toBe(undefined);
});

describe('doctor controller', doctorTests(request));
describe('device controller', deviceTests(request));
describe('session controller', sessionTests(request));

afterAll(async () => {
  await closeTestsDatabaseConnection();
});
