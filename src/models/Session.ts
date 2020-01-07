import mongoose, { Schema, Document } from "mongoose";

type isSessionAvailableFunction = (patientId: string, doctorId: string, date: Date) => Promise<boolean>;

export interface ISession extends Document {
  patient: Schema.Types.ObjectId;
  doctor: Schema.Types.ObjectId;
  date: Date;
}

export const isSessionAvailable: isSessionAvailableFunction = async function(
  patientId: string,
  doctorId: string,
  date: Date
) {
  const dateDebut = new Date(date.getTime() - 30 * 60 * 1000);
  const dateFin = new Date(date.getTime() + 30 * 60 * 1000);
  // console.warn({ "date debut": dateDebut, date: date, "date fin": dateFin });

  const sessionsCount = await Session.find({
    $or: [
      {
        $and: [
          { doctor: doctorId },
          {
            $and: [{ date: { $gt: dateDebut } }, { date: { $lt: dateFin } }]
          }
        ]
      },
      {
        $and: [
          { patient: patientId },
          {
            $and: [{ date: { $gt: dateDebut } }, { date: { $lt: dateFin } }]
          }
        ]
      }
    ]
  }).countDocuments();
  return sessionsCount === 0;
};

const SessionSchema = new Schema({
  patient: { type: Schema.Types.ObjectId, ref: "Patient", required: true },
  doctor: { type: Schema.Types.ObjectId, ref: "Doctor", required: true },
  date: { type: Date, required: true }
});

const Session = mongoose.model<ISession>("Session", SessionSchema);

export default Session;
