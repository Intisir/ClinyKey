const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const Prescription = require("../../models/Prescription");
const moment = require("moment");
const Patient = require("../../models/Patient");
const Clients = require("../../models/Client");
const LabResult = require("../../models/LabResult");

const nodemailer = require("nodemailer");

//Get prescription by doc oid
router.post(
  "/byId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //console.log(req.body.presid);

    Prescription.find({
      _id: req.body.presid
    })
      .sort({ date: 1 })
      .then(prescription => {
        if (prescription) {
          //console.log(prescription);

          res.json(prescription);
        } else {
          return res.status(400).json({ error: "No Prescription" });
        }
      });
  }
);

router.post(
  "/testresultbyid",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //console.log(req.body.presid);

    //console.log(req.body.presid);

    LabResult.find({
      presid: req.body.presid
    })
      .sort({ date: -1 })
      .then(prescription => {
        if (prescription) {
          //console.log(prescription);

          res.json(prescription);
        } else {
          return res.status(400).json({ error: "No Prescription" });
        }
      });
  }
);

router.post(
  "/publishReport",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req.body.data);
    LabResult.findOne({
      _id: req.body.data._id
    }).then(prescription => {
      if (prescription) {
        LabResult.findOneAndUpdate(
          { _id: req.body.data._id },
          { $set: { published: true, results: req.body.data.results } },
          { new: true }
        ).then(result => {
          if (result) {
            Clients.findOne({ oid: req.body.data.pid }).then(client => {
              if (client) {
                let transporter = nodemailer.createTransport({
                  host: "smtp.gmail.com",
                  auth: {
                    user: "habiiib4@gmail.com", // generated ethereal user
                    pass: "F0rgetmen0T" // generated ethereal password
                  }
                });

                let options = {
                  from: "habiiib4@gmail.com", // sender address
                  to: client.email, // list of receivers
                  subject: "ClinyKey Reports", // Subject line
                  text:
                    "Your Report is ready. Please visit clinykey portal to see them." // plain text body
                };
                transporter.sendMail(options, (e, i) => {
                  console.log(i);
                  console.log(e);
                });
              } else {
                console.log("Login Error");
              }
            });
          }
          res.json({ succcess: true });
        });
      } else {
        return res.status(400).json({ succcess: false });
      }
    });
  }
);
router.post(
  "/samplecollected",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req.body.id);
    LabResult.findOne({
      _id: req.body.id
    }).then(prescription => {
      if (prescription) {
        LabResult.findOneAndUpdate(
          { _id: req.body.id },
          { collected: true },
          { new: true }
        ).then(result => {
          res.json({ succcess: true });
        });
      } else {
        return res.status(400).json({ succcess: false });
      }
    });
  }
);

router.post(
  "/getTestResultByID",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req.body.resid);
    LabResult.findOne({
      _id: req.body.resid
    }).then(prescription => {
      if (prescription) {
        res.json(prescription);
      } else {
        return res.status(400).json({ succcess: false });
      }
    });
  }
);

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Prescription.aggregate([
      // Join with user_info table
      {
        $lookup: {
          from: "doctors-profiles", // other table name
          localField: "did", // name of users table field
          foreignField: "oid", // name of userinfo table field
          as: "doc_info" // alias for userinfo table
        }
      },
      { $unwind: "$doc_info" }, // $unwind used for getting data in object or for one record only
      // define some conditions here
      {
        $match: {
          pid: req.user.oid
        }
      },
      // define which fields are you want to fetch
      {
        $project: {
          _id: 1,
          medicines: 1,
          tests: 1,
          advices: 1,
          date: 1,
          did: 1,
          cid: 1,
          name: "$doc_info.name",
          pic: "$doc_info.picture",
          chambers: "$doc_info.chambers"
        }
      },
      { $sort: { date: -1 } }
    ]).then(pres => {
      if (pres) {
        res.json(pres);
      }
    });
  }
);

router.get(
  "/gettestresultcollected",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("Ht1");

    LabResult.aggregate([
      // Join with user_info table
      {
        $lookup: {
          from: "patients-profiles", // other table name
          localField: "pid", // name of users table field
          foreignField: "patientID", // name of userinfo table field
          as: "pat_info" // alias for userinfo table
        }
      },
      { $unwind: "$pat_info" }, // $unwind used for getting data in object or for one record only
      // define some conditions here
      {
        $match: {
          $and: [
            {
              collected: true
            },
            {
              published: false
            }
          ]
        }
      },
      // define which fields are you want to fetch
      {
        $project: {
          _id: 1,
          presid: 1,
          pid: 1,
          did: 1,
          diagid: 1,
          after: 1,
          results: 1,
          collected: 1,
          published: 1,
          date: 1,
          name: "$pat_info.name",
          pic: "$pat_info.picture"
        }
      },
      { $sort: { date: -1 } }
    ]).then(pres => {
      if (pres) {
        res.json(pres);
        //console.log(pres);
      }
    });
  }
);
router.get(
  "/gettestresult",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("Ht1");

    LabResult.aggregate([
      // Join with user_info table
      {
        $lookup: {
          from: "patients-profiles", // other table name
          localField: "pid", // name of users table field
          foreignField: "patientID", // name of userinfo table field
          as: "pat_info" // alias for userinfo table
        }
      },
      { $unwind: "$pat_info" }, // $unwind used for getting data in object or for one record only
      // define some conditions here
      {
        $match: {
          collected: false
        }
      },
      // define which fields are you want to fetch
      {
        $project: {
          _id: 1,
          presid: 1,
          pid: 1,
          did: 1,
          diagid: 1,
          after: 1,
          results: 1,
          collected: 1,
          published: 1,
          date: 1,
          name: "$pat_info.name",
          pic: "$pat_info.picture"
        }
      },
      { $sort: { date: -1 } }
    ]).then(pres => {
      if (pres) {
        res.json(pres);
        //console.log(pres);
      }
    });
  }
);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Patient.findOne({
      $or: [{ phone: req.body.phone }, { key: req.body.phone }]
    })
      .then(patient => {
        if (!patient) {
          return res.status(404).json({ Error: "Profile not found" });
        }

        Prescription.aggregate([
          // Join with user_info table
          {
            $lookup: {
              from: "doctors-profiles", // other table name
              localField: "did", // name of users table field
              foreignField: "oid", // name of userinfo table field
              as: "doc_info" // alias for userinfo table
            }
          },
          { $unwind: "$doc_info" }, // $unwind used for getting data in object or for one record only
          // define some conditions here
          {
            $match: {
              pid: patient.patientID
            }
          },
          // define which fields are you want to fetch
          {
            $project: {
              _id: 1,
              medicines: 1,
              tests: 1,
              advices: 1,
              date: 1,
              pid: 1,
              did: 1,
              cid: 1,
              name: "$doc_info.name",
              pic: "$doc_info.picture",
              chambers: "$doc_info.chambers"
            }
          },
          { $sort: { date: -1 } }
        ]).then(pres => {
          if (pres) {
            res.json(pres);
          }
        });
      })
      .catch(err => console.log(err));
  }
);

router.post(
  "/saveTestResults",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //console.log(req.body.data);
    const newPres = new LabResult({
      presid: req.body.data.presid,
      pid: req.body.data.pid,
      did: req.body.data.did,
      diagid: req.body.data.digid,
      after: req.body.data.after,
      results: req.body.data.results,
      collected: false
    });

    newPres.save().then(labres => res.json({ succcess: true }));
  }
);

router.post(
  "/addPrescription",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const today = moment().startOf("day");
    Prescription.findOne({
      $and: [
        { did: req.user.oid },
        { pid: req.body.PrescriptionData.pid },
        { cid: req.body.PrescriptionData.cid },
        {
          date: {
            $gte: today.toDate(),
            $lte: moment(today)
              .endOf("day")
              .toDate()
          }
        }
      ]
    })
      .then(pres => {
        if (pres) {
          //Upadte
        } else {
          const newPres = new Prescription({
            cid: req.body.PrescriptionData.cid,
            pid: req.body.PrescriptionData.pid,
            did: req.user.oid,
            medicines: req.body.PrescriptionData.medicineList,
            tests: req.body.PrescriptionData.testList,
            advices: req.body.PrescriptionData.adviceList
          });

          newPres.save().then(prescription => res.json(prescription));
        }
      })
      .catch(err => res.status(400).json({ errors: err }));
  }
);

module.exports = router;
