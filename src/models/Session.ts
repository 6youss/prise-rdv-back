import mongoose, { Schema, Document, Model } from "mongoose";
const { ObjectId } = mongoose.Types;

type isSessionAvailableFunction = (doctorId: string, patientId: string, date: Date) => Promise<boolean>;

export interface ISession extends Document {
  patient: Schema.Types.ObjectId;
  doctor: Schema.Types.ObjectId;
  date: Date;
  isSessionAvailable: isSessionAvailableFunction;
}

const isSessionAvailable: isSessionAvailableFunction = async function(doctorId, patientId, date) {
  const dateDebut = new Date(date.getTime() - 20 * 60 * 1000);
  const dateFin = new Date(date.getTime() + 20 * 60 * 1000);

  const sessionsCount = await Session.find({
    $or: [
      {
        $and: [
          { doctor: new ObjectId(doctorId) },
          {
            $and: [{ date: { $gt: dateDebut } }, { date: { $lt: dateFin } }]
          }
        ]
      },
      {
        $and: [
          { patient: ObjectId(patientId) },
          {
            $and: [{ date: { $gt: dateDebut } }, { date: { $lt: dateFin } }]
          }
        ]
      }
    ]
  }).count();
  return sessionsCount === 0;
};

const SessionSchema = new Schema({
  patient: { type: Schema.Types.ObjectId, ref: "Patient" },
  doctor: { type: Schema.Types.ObjectId, ref: "Doctor" },
  date: Date
});

SessionSchema.methods.isSessionAvailable = isSessionAvailable;

const Session: Model<ISession> = mongoose.model<ISession>("Session", SessionSchema);

export default Session;
