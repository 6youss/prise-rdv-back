import {Request, Response} from 'express';
import mongoose, { Schema } from 'mongoose';
import Session from '../models/Session';
import Doctor from '../models/Doctor';
import Patient from '../models/Patient';
import {sendNotification} from '../utils/pushNotifications';
import {queryIsSessionAvailableJs} from '../models/Queries';

class SessionController {
  /**
   * GET /sessions/:sessionId
   * Get the session details
   */
  static async getSessionDetails(req: Request, res: Response) {
    try {
      const {sessionId} = req.params;
      const sessionDetails = await Session.aggregate([
        {
          $match: {
            _id: mongoose.Types.ObjectId(sessionId),
          },
        },
        {
          $lookup: {
            from: 'patient',
            localField: 'patient',
            foreignField: '_id',
            as: 'patientDetails',
          },
        },
        {
          $project: {
            _id: 1,
            date: 1,
            patientDetails: {$arrayElemAt: ['$patientDetails', 0]},
          },
        },
      ]);
      if (!sessionDetails) return res.sendStatus(404);

      res.status(200).json({session: sessionDetails[0]});
    } catch (error) {
      res.sendStatus(500);
    }
  }

  /**
   * GET /sessions/doctor/:doctorId
   * Get the doctor's sessions
   */
  static async getDoctorSessions(req: Request, res: Response) {
    try {
      const { doctorId } = req.params;
      const doc = await Doctor.findById(doctorId);
      if (!doc) return res.sendStatus(404);
      const doctorSessions = await Session.find({doctor: doctorId as unknown as Schema.Types.ObjectId})
        .select('_id doctor patient date')
        .sort({date: 1});
      res.status(200).json({sessions: doctorSessions});
    } catch (error) {
      res.sendStatus(500);
    }
  }
  /**
   * GET /sessions/patient/:patientId
   * Get the patient's sessions
   */
  static async getPatientSessions(req: Request, res: Response) {
    try {
      const {patientId} = req.params;
      const patient = await Patient.findById(patientId);
      if (!patient) return res.sendStatus(404);
      const patientSessions = await Session.find({patient: patientId as unknown as Schema.Types.ObjectId}).select(
        '_id doctor patient date',
      );
      if (patientSessions.length === 0) {
        res.sendStatus(204);
      } else {
        res.status(200).json({sessions: patientSessions});
      }
    } catch (error) {
      res.sendStatus(500);
    }
  }

  /**
   * POST /sessions
   * Add a new session for the user.
   */
  static async postSession(req: Request, res: Response) {
    try {
      const {patientId, doctorId, date} = req.body;
      const dateObject = new Date(date);
      const sessionAvailable = await queryIsSessionAvailableJs(
        doctorId,
        dateObject,
      );
      if (!sessionAvailable) {
        return res.status(412).json({message: 'Unavailable session'});
      }
      const session = await Session.create({
        patient: patientId,
        doctor: doctorId,
        date: dateObject,
      });

      res.status(201).json({session});

      //notify the doctor about the reserved session
      await sendNotification(
        doctorId,
        {data: {type: 'NEW_DOCTOR_SESSION', patientId, date}},
        'doctor',
      ).catch((error) => console.log('push notification error: ', error));
    } catch (error) {
      res.status(500).json({message: error.message});
    }
  }
}

export default SessionController;
