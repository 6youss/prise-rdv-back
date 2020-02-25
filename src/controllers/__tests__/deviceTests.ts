import supertest from "supertest";

export const deviceTests = (request: supertest.SuperTest<supertest.Test>) => () => {
  describe("device integration", () => {
    let patientToken: string;
    beforeAll(async () => {
      const res = await request.post("/api/user/login").send({
        username: "patient",
        password: "0000"
      });
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("accessToken");
      patientToken = res.body.accessToken;
    });

    it("should add a new device", async () => {
      const res = await request
        .post(`/api/devices/`)
        .send({
          fcmToken: "fcmToken",
          platform: "ios"
        })
        .set("Authorization", "Bearer " + patientToken);
      expect(res.status).toBe(201);
    });

    it("should be successfull with existing defice with the same token", async () => {
      const res = await request
        .post(`/api/devices/`)
        .send({
          fcmToken: "fcmToken",
          platform: "ios"
        })
        .set("Authorization", "Bearer " + patientToken);
      expect(res.status).toBe(200);
    });

    it("should add a new device with a diffrent token", async () => {
      const res = await request
        .post(`/api/devices/`)
        .send({
          fcmToken: "fcmToken2",
          platform: "ios"
        })
        .set("Authorization", "Bearer " + patientToken);
      expect(res.status).toBe(201);
    });
  });
};
