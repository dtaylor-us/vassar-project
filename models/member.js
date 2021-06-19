const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create student schema & model
const MemberSchema = new Schema({
    name: {
        type: String,
    },
    relation: {
        type: String,
        required: [true, 'Relation field is required']
    },
    sister: {
        type: String,
        required: [true, 'Sister field is required']
    },
    work: {
        type: String,
    },
    cell: {
        type: String,
    },
    email: {
        type: String,
    },
    birthday: {
        type: String,
    },
    address: {
        type: String,
    },
    city: {
        type: String,
    },
    state: {
        type: String,
    },
    zip: {
        type: String,
    }
});

const Student = mongoose.model('student', MemberSchema);
module.exports = Student;
