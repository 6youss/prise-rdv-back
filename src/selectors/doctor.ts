import Doctor from '../models/Doctor';
import {Schema} from 'mongoose';

export async function doctorById(id: Schema.Types.ObjectId | string) {
  return await Doctor.findById(id, {
    'unavailablities._id': 0,
    'workingHours._id': 0,
    'sessionDurations._id': 0,
    __v: 0,
  });
}
