import Doctor from './Doctor';
import Session from './Session';

//had to do it with js :x
export async function queryIsSessionAvailableJs(
  doctorId: string,
  dateToReserve: Date,
): Promise<boolean> {
  const doctor = await Doctor.findById(doctorId);
  if (!doctor) return false;
  //is in working hours
  let isWithinTheWorkingHours: boolean = false;
  for (let workingHour of doctor.workingHours) {
    if (isDateInRange(dateToReserve, workingHour.from, workingHour.to)) {
      if (
        isNumberInRange(
          timeToMinutes(dateToReserve),
          workingHour.opensAt,
          workingHour.closesAt,
        )
      ) {
        isWithinTheWorkingHours = true;
        break;
      }
    }
  }
  if (!isWithinTheWorkingHours) return false;

  //out of unavailibilities
  for (let unavailableHour of doctor.unavailablities) {
    if (
      isDateInRange(dateToReserve, unavailableHour.from, unavailableHour.to)
    ) {
      return false;
    }
  }
  let currentDuration: number = 30;
  for (let duration of doctor.sessionDurations) {
    if (isDateInRange(dateToReserve, duration.from, duration.to)) {
      currentDuration = duration.duration;
      break;
    }
  }

  //doesn't interfere with other sessions
  const sessionsCount = await Session.find({
    $and: [
      {doctor: doctorId},
      {
        $and: [
          {date: {$gt: addMinutes(dateToReserve, -currentDuration)}},
          {date: {$lt: addMinutes(dateToReserve, currentDuration)}},
        ],
      },
    ],
  }).countDocuments();

  if (sessionsCount > 0) return false;
  return true;
}

function addMinutes(date: Date, minutes: number) {
  return new Date(date.getTime() + minutes * 60 * 1000);
}

function timeToMinutes(date: Date): number {
  return date.getHours() * 60 + date.getMinutes();
}

function isNumberInRange(num: number, from: number, to: number): boolean {
  return num > from && num < to;
}

function isDateInRange(date: Date, from: Date, to: Date | null): boolean {
  return (
    date.getTime() > from.getTime() &&
    (to === null || date.getTime() < to.getTime())
  );
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
