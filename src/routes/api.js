const express = require("express");
const router = express.Router();
const Patient = require("../models/patient");
const Visit = require("../models/visit");

//Start of patient's route
//get all patients from database
router.get("/patients", function(req, res, next) {
  Patient.find({}).then(function(patient) {
    res.send(patient);
  });
});

//get a single patient from database
router.get("/patients/:hospitalNumber", function(req, res, next) {
  Patient.findOne({ hospitalNumber: req.params.hospitalNumber }, function(
    err,
    patient
  ) {
    if (!patient) {
      res
        .status(200)
        .send({ status: "not found", message: "no patient found" });
    } else {
      res.status(200).send({
          status: "found",
          message: "patient found",
          patient: {
              hospitalNumber: patient.hospitalNumber,
              firstName: patient.firstName,
              lastName: patient.lastName,
              HMO: patient.HMO,
              email: patient.email,
              phoneNumber: patient.phoneNumber,
              createdAt: patient.createdAt,
              updatedAt: patient.updatedAt,
              _id: patient._id
          }
      });
    }
  });
});

//add a patient to database
router.post("/patients", function(req, res, next) {
  Patient.create(req.body)
    .then(function(patient) {
      res.status(200).send(patient);
    })
    .catch(next);
});

//update a patient in database
router.put("/patients/:hospitalNumber", function(req, res, next) {
  Patient.findOneAndUpdate(
    { hospitalNumber: req.params.hospitalNumber },
    req.body
  )
    .then(function() {
      Patient.findOne({ hospitalNumber: req.params.hospitalNumber }).then(
        function(patient) {
          res.status(200).send(patient);
        }
      );
    })
    .catch(next);
});

//delete a patient from database
router.delete("/patients/:hospitalNumber", function(req, res, next) {
  Patient.findOneAndRemove({ hospitalNumber: req.params.hospitalNumber })
    .then(function(patient) {
      res.status(200).send(patient);
    })
    .catch(next);
});

//start of visit routes
//get all visits by a patient with hospitalNumber
router.get("/visits/:hospitalNumber", function(req, res, next) {
  Visit.find({ hospitalNumber: req.params.hospitalNumber }).then(function(
    visit
  ) {
    if (visit < 1) {
      res.send({
        status: "no visits",
        message: "This patient doesn't have any visits on record"
      });
    } else {
      res.send({
          status: "found",
          message: "This patient has visits on record",
          visits: visit
      });
    }
  });
});

//record new visit
router.post("/visits", function(req, res, next) {
  Visit.create(req.body).then(function(visit) {
    res.status(200).send({
      status: "success",
      message: "visit recorded",
      meta: {
        hospitalNumber: visit.hospitalNumber,
        visitDate: visit.visitDate,
        visitType: visit.visitType
      }
    });
  });
});
module.exports = router;
