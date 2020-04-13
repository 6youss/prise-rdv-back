import * as admin from 'firebase-admin';
import User, {IUserType} from '../models/User';
import Device from '../models/Device';
import { Schema } from 'mongoose';

const firebaseServiceAccountFile = JSON.parse(
  process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON,
);

const serviceAccount = firebaseServiceAccountFile as admin.ServiceAccount;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DB_URL,
});

const messaging = admin.messaging();

export async function sendNotification(
  id: string,
  payload: admin.messaging.MessagingPayload,
  userType?: IUserType['value'],
) {
  let userId = id;
  if (userType) {
    const [foundUser] = await User.find({'userType.targetId': id});
    if (foundUser) {
      userId = foundUser.id;
    }
  }

  const foundDevices = await Device.find({user: userId as unknown as Schema.Types.ObjectId});

  const fcmTokens = foundDevices.map(device => {
    return device.fcmToken;
  });

  if (fcmTokens && fcmTokens.length > 0) {
    return await messaging.sendToDevice(fcmTokens, payload);
  }
  throw new Error(
    `notifications error: the user of type ${userType} with the ${id} doesn't have a registered device`,
  );
}

export default messaging;
