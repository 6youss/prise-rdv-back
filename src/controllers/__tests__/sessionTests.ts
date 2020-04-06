import {
  defaultPatientIdMock,
  defaultDoctorIdMock,
  defaultUsers,
  generateNewId,
  generateNewDoctor,
} from '../../utils/testUtils';
import supertest from 'supertest';
import Session from '../../models/Session';
import {queryIsSessionAvailableJs} from '../../models/Queries';
import {addDays} from '../../utils/zdate';

export const sessionTests = (
  request: supertest.SuperTest<supertest.Test>,
) => () => {
  let patientToken: string;
  beforeAll(async () => {
    const res = await request.post('/api/user/login').send({
      username: 'patient',
      password: '0000',
    });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('accessToken');
    patientToken = res.body.accessToken;
  });

  describe('test isSessionAvailable function', () => {
    test("available in doctor's work hours", async () => {
      const inDoctorWorkHoursDate = new Date();
      inDoctorWorkHoursDate.setUTCHours(8);
      expect(
        await queryIsSessionAvailableJs(
          defaultDoctorIdMock,
          inDoctorWorkHoursDate,
        ),
      ).toBe(true);

      inDoctorWorkHoursDate.setUTCHours(10);
      expect(
        await queryIsSessionAvailableJs(
          defaultDoctorIdMock,
          inDoctorWorkHoursDate,
        ),
      ).toBe(true);
    });
    test("not available out of doctor's work hours", async () => {
      const outOfDoctorWorkHoursDate = new Date();
      outOfDoctorWorkHoursDate.setUTCHours(19);
      expect(
        await queryIsSessionAvailableJs(
          defaultDoctorIdMock,
          outOfDoctorWorkHoursDate,
        ),
      ).toBe(false);

      outOfDoctorWorkHoursDate.setUTCHours(7);
      expect(
        await queryIsSessionAvailableJs(
          defaultDoctorIdMock,
          outOfDoctorWorkHoursDate,
        ),
      ).toBe(false);
    });

    test('not available in the unavailabilities set by the doctor', async () => {
      defaultUsers.doctor.unavailablities.push({
        from: new Date(new Date().setUTCHours(7)),
        to: new Date(new Date().setUTCHours(20)),
      });
      await defaultUsers.doctor.save();

      const doctorUnavailableHour = new Date();
      doctorUnavailableHour.setUTCHours(8);

      expect(
        await queryIsSessionAvailableJs(
          defaultDoctorIdMock,
          doctorUnavailableHour,
        ),
      ).toBe(false);
    });

    test('not available because it interferes with allready taken hours', async () => {
      //create session with specific date
      const existingSessionDate = new Date();
      await Session.create({
        patient: defaultPatientIdMock,
        doctor: defaultDoctorIdMock,
        date: existingSessionDate,
      });
      const newSessionDate = new Date(
        existingSessionDate.getTime() - 10 * 60 * 1000,
      );
      const available = await queryIsSessionAvailableJs(
        defaultDoctorIdMock,
        newSessionDate,
      );
      expect(available).toBe(false);
    });
  });

  describe('add session to server', () => {
    test('should add session with valid data', async () => {
      const availableSessionDate = addDays(new Date(), 2);
      const res = await request
        .post('/api/sessions')
        .set('Authorization', 'Bearer ' + patientToken)
        .send({
          patientId: defaultPatientIdMock,
          doctorId: defaultDoctorIdMock,
          date: availableSessionDate,
        });
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('session');
    });
  });

  describe('get the doctor sessions', () => {
    test('should get doctor sessions with valid existing doctorId', async () => {
      const res = await request
        .get(`/api/sessions/doctor/${defaultUsers.doctor._id}`)
        .set('Authorization', 'Bearer ' + patientToken);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('sessions');
      expect(res.body.sessions).toBeInstanceOf(Array);
    });
    test("should return empty array if doctor doesn't have any sessions", async () => {
      const doctor = await generateNewDoctor(undefined);
      const res = await request
        .get(`/api/sessions/doctor/${doctor._id}`)
        .set('Authorization', 'Bearer ' + patientToken);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('sessions');
      expect(res.body.sessions).toBeInstanceOf(Array);
      expect(res.body.sessions).toHaveLength(0);
    });

    test("should return 404 if doctor doesn't exist", async () => {
      const res = await request
        .get(`/api/sessions/doctor/${generateNewId()}`)
        .set('Authorization', 'Bearer ' + patientToken);
      expect(res.status).toBe(404);
    });

    test('should send 412 status with invalid id format', async () => {
      const invalidIdFormat = 'invalidIdFormat';
      const res = await request
        .get(`/api/sessions/doctor/${invalidIdFormat}`)
        .set('Authorization', 'Bearer ' + patientToken);
      expect(res.status).toBe(412);
    });
  });
};
