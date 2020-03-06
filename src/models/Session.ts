import mongoose, {Schema, Document} from 'mongoose';

export interface ISession extends Document {
  patient: Schema.Types.ObjectId;
  doctor: Schema.Types.ObjectId;
  date: Date;
}

const SessionSchema = new Schema({
  patient: {type: Schema.Types.ObjectId, ref: 'Patient', required: true},
  doctor: {type: Schema.Types.ObjectId, ref: 'Doctor', required: true},
  date: {type: Date, required: true},
});

const Session = mongoose.model<ISession>('Session', SessionSchema);

export default Session;
