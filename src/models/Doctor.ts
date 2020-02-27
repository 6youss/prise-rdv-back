import mongoose, {Schema, Document} from 'mongoose';

export interface DateRange {
  from: Date;
  to: Date;
}
export interface SessionDuration extends DateRange {
  duration: string;
}

export interface WorkingHours extends DateRange {
  start: string;
  end: string;
}

export type ReservationType = 'counter' | 'time';

export interface IDoctor extends Document {
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  unavailablities: Array<DateRange>;
  workingHours: Array<WorkingHours>;
  sessionDurations: Array<SessionDuration>;
  reservationType: ReservationType;
}

const DoctorSchema = new Schema({
  firstName: String,
  lastName: String,
  phone: String,
  address: String,
  unavailablities: [{from: Date, to: Date}],
  workingHours: [{from: Date, to: Date, start: String, end: String}],
  sessionDurations: [{from: Date, to: Date, duration: String}],
  reservationType: {type: String, enum: ['counter', 'time'], default: 'time'},
});

const Doctor = mongoose.model<IDoctor>('Doctor', DoctorSchema, 'doctor');

export default Doctor;
