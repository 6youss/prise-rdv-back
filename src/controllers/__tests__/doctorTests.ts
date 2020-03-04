import supertest from 'supertest';
import {defaultUsers, generateNewId} from '../../utils/testUtils';

export const doctorTests = (
  request: supertest.SuperTest<supertest.Test>,
) => () => {
  describe('doctor integration', () => {
    it('should get an existing doctor with a valid phone', async () => {
      const res = await request.get(`/api/doctor/${defaultUsers.doctor.phone}`);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('doctor');
    });
    it("should return a 404 status if there's no doctor with the sent phone", async () => {
      const unexistingNumber = '0777777777';
      const res = await request.get(`/api/doctor/${unexistingNumber}`);
      expect(res.status).toBe(404);
    });
    it('should return a 412 status if the phone format is wrong', async () => {
      const wrongFormat = 'wrong';
      const res = await request.get(`/api/doctor/${wrongFormat}`);
      expect(res.status).toBe(412);
    });

    it('should update a doctor with valid updateObject', async () => {
      const res = await request
        .patch(`/api/doctor/${defaultUsers.doctor.id}`)
        .set('Content-Type', 'application/json')
        .send({
          firstName: 'newfirstname',
        });
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('doctor');
    });
  });
};
