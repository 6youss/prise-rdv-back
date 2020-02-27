import mongoose, {Schema, Document} from 'mongoose';

export interface DateRange {
  from: Date;
  to: Date;
}
export interface SessionDuration extends DateRange {
  duration: number;
}

export interface WorkingHours extends DateRange {
  opensAt: string;
  closesAt: string;
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
  workingHours: {
    type: [{from: Date, to: Date, opensAt: String, closesAt: String}],
    default: {from: new Date(), to: null, opensAt: '08:00', closesAt: '17:00'},
  },
  sessionDurations: {
    type: [{from: Date, to: Date, duration: Number}],
    default: {from: new Date(), to: null, duration: 30},
  },
  reservationType: {type: String, enum: ['counter', 'time'], default: 'time'},
});

const Doctor = mongoose.model<IDoctor>('Doctor', DoctorSchema, 'doctor');

export default Doctor;
