import mongoose, { Schema, Document, Model } from "mongoose";
const { ObjectId } = mongoose.Types;

type isSessionAvailableFunction = () => Promise<boolean>;

export interface ISession extends Document {
  patient: Schema.Types.ObjectId;
  doctor: Schema.Types.ObjectId;
  date: Date;
  isSessionAvailable: isSessionAvailableFunction;
}

const isSessionAvailable: isSessionAvailableFunction = async function() {
  const dateDebut = new Date(this.date.getTime() - 20 * 60 * 1000);
  const dateFin = new Date(this.date.getTime() + 20 * 60 * 1000);

  const sessionsCount = await Session.find({
    $or: [
      {
        $and: [
          { doctor: this.doctorId },
          {
            $and: [{ date: { $gt: dateDebut } }, { date: { $lt: dateFin } }]
          }
        ]
      },
      {
        $and: [
          { patient: this.patientId },
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

SessionSchema.methods.isSessionAvailable = isSessionAvailable;

const Session = mongoose.model<ISession>("Session", SessionSchema);

export default Session;
