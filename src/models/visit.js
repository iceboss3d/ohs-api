const mongoose = require('mongoose')
const Schema = mongoose.Schema;

//Patient's visit Schema
const VisitSchema = new Schema({
    hospitalNumber: {
        type: String,
        required: true
    },
    visitDate: {
        type: Date,
        required: true
    },
    visitType: {
        type: String,
        required: true
    }
});

const Visit = mongoose.model('visit', VisitSchema);
module.exports = Visit;