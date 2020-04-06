import Doctor from './Doctor';
import Session from './Session';
import {
  isDateInRange,
  isNumberInRange,
  timeToMinutes,
  addMinutes,
} from '../utils/zdate';

//had to do it with js :x
export async function queryIsSessionAvailableJs(
  doctorId: string,
  dateToReserve: Date,
): Promise<boolean> {
  const doctor = await Doctor.findById(doctorId);
  if (!doctor) return false;
  //is in working hours
  let isWithinWorkingHours = true;
  for (let workingHour of doctor.workingHours) {
    if (isDateInRange(dateToReserve, workingHour.from, workingHour.to)) {
      if (
        !isNumberInRange(
          timeToMinutes(dateToReserve),
          workingHour.opensAt,
          workingHour.closesAt,
        )
      ) {
        isWithinWorkingHours = false;
      }
    }
  }

  if (!isWithinWorkingHours) return false;

  //out of unavailibilities
  for (let unavailableHour of doctor.unavailablities) {
    if (
      isDateInRange(
        dateToReserve,
        unavailableHour.from,
        unavailableHour.to,
        false,
      )
    ) {
      return false;
    }
  }

  //doesn't interfere with other sessions
  let sessionDuration: number = 30;
  for (let duration of doctor.sessionDurations) {
    if (isDateInRange(dateToReserve, duration.from, duration.to)) {
      sessionDuration = duration.duration;
      break;
    }
  }

  const sessionsCount = await Session.find({
    doctor: doctorId,
    $and: [
      {date: {$gt: addMinutes(dateToReserve, -sessionDuration)}},
      {date: {$lt: addMinutes(dateToReserve, sessionDuration)}},
    ],
  }).countDocuments();

  if (sessionsCount > 0) return false;
  return true;
}

//@Warning this gives a false result"
/*
async function queryIsSessionAvailable(doctorId: string, dateToReserve: Date) {
  const dateToReserveMinutes =
    dateToReserve.getHours() * 60 + dateToReserve.getMinutes();
  return await Doctor.aggregate([
    {
      $match: {
        _id: doctorId,
        $and: [
          //date in it's range
          {
            'workingHours.from': {
              $lte: dateToReserve,
            },
          },
          {
            $or: [
              {'workingHours.to': {$gte: dateToReserve}},
              {'workingHours.to': {$eq: null}},
            ],
          },
          //reservation hour in the range of opening and closing
          {
            'workingHours.opensAt': {
              $lt: dateToReserveMinutes,
            },
          },
          {
            'workingHours.closesAt': {
              $gt: dateToReserveMinutes,
            },
          },
          //reservation date out of unavailibilities ranges
          {
            'unavailablities.from': {
              $not: {
                $lte: dateToReserve,
              },
            },
          },
          {
            'unavailablities.to': {
              $not: {
                $gte: dateToReserve,
              },
            },
          },
        ],
      },
    },
  ]);
}
*/
