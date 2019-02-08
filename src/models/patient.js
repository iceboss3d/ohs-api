const mongoose = require('mongoose')
const Schema = mongoose.Schema;

//Patient schema
const PatientSchema = new Schema({
    hospitalNumber: {
        type: String,
        required: [true, 'Hospital Number is required']
    },
    firstName: {
        type: String,
        required: [true, "Patient's First Name is required"]
    },
    lastName: {
        type: String,
        required: [true, "Patient's Last Name is required"]
    },
    HMO: {
        type: String,
        required: false,
        default: "Private"
    },
    phoneNumber: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date
    }
})

const Patient = mongoose.model('patient', PatientSchema);

module.exports = Patient;