import supertest from "supertest";
import { generateNewId, defaultUsers } from "../../utils/testUtils";

export const deviceTests = (request: supertest.SuperTest<supertest.Test>) => () => {
  describe("device integration", () => {
    it("should return a 404 status if there's no user with the sent userId", async () => {
      const res = await request.post(`/api/devices/`).send({
        user: generateNewId(),
        fcmToken: "hhhh",
        platform: "ios"
      });
      expect(res.status).toBe(404);
    });

    it("should add a new device", async () => {
      const res = await request.post(`/api/devices/`).send({
        user: defaultUsers.doctorUser.id,
        fcmToken: "fcmToken",
        platform: "ios"
      });
      expect(res.status).toBe(201);
    });

    it("should be successfull with existing defice with the same token", async () => {
      const res = await request.post(`/api/devices/`).send({
        user: defaultUsers.doctorUser.id,
        fcmToken: "fcmToken",
        platform: "ios"
      });
      expect(res.status).toBe(200);
    });

    it("should add a new device with a diffrent token", async () => {
      const res = await request.post(`/api/devices/`).send({
        user: defaultUsers.doctorUser.id,
        fcmToken: "fcmToken2",
        platform: "ios"
      });
      expect(res.status).toBe(201);
    });
  });
};
