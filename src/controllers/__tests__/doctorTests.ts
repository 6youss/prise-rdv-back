import supertest from "supertest";
import { defaultUsers } from "../../setupTests";

export const doctorTests = (request: supertest.SuperTest<supertest.Test>) => () => {
  describe("doctor integration", () => {
    it("should get an existing doctor with a valid phone", async () => {
      expect(defaultUsers.doctor).not.toBe(undefined);
      const res = await request.get(`/api/doctor/${defaultUsers.doctor.phone}`);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("doctor");
      // expect(true).toBe(true);
    });
  });
};
