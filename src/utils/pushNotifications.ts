import * as admin from "firebase-admin";
import User, { IUserType } from "../models/User";
import Device from "../models/Device";

const firebaseServiceAccountFile = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON);

const serviceAccount = firebaseServiceAccountFile as admin.ServiceAccount;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DB_URL
});

const messaging = admin.messaging();

export async function sendNotification(
  id: string,
  payload: admin.messaging.MessagingPayload,
  userType?: IUserType["value"]
) {
  let userId = id;
  if (userType) {
    const [foundUser] = await User.find({ "userType.targetId": id });
    if (foundUser) {
      userId = foundUser.id;
    }
  }

  const [foundDevice] = await Device.find({ user: userId });

  if (foundDevice) {
    messaging.sendToDevice(foundDevice.fcmToken, payload);
  }
  throw new Error("can't send notification to unexisting user");
}

export default messaging;
