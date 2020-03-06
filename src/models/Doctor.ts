import mongoose, {Schema, Document} from 'mongoose';
import {ZTime} from '../utils/ztime';

export interface DateRange {
  from: Date;
  to: Date;
}
export interface SessionDuration extends DateRange {
  duration: number;
}

export interface WorkingHours extends DateRange {
  opensAt: number;
  closesAt: number;
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
  unavailablities: {type: [{from: Date, to: Date}], default: null},
  workingHours: {
    type: [{from: Date, to: Date, opensAt: Number, closesAt: Number}],
    default: {
      from: ZTime.setDateAtTime(new Date(), ZTime.fromHours(0)),
      to: null,
      opensAt: ZTime.fromString('08:00').toMinutes(),
      closesAt: ZTime.fromString('17:00').toMinutes(),
    },
  },
  sessionDurations: {
    type: [{from: Date, to: Date, duration: Number}],
    default: {from: new Date(), to: null, duration: 30},
  },
  reservationType: {type: String, enum: ['counter', 'time'], default: 'time'},
});

const Doctor = mongoose.model<IDoctor>('Doctor', DoctorSchema, 'doctor');

export default Doctor;
