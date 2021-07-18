const mongoose = require('mongoose');

const PersonSchema = mongoose.Schema({
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        sister: {
            type: String,
            required: true,
            enum: ['BEA', 'LOLA', 'EULA', 'MERT', 'BOO', 'ELOISE', 'PETIE',]
        },
        relationship: {
            type: String,
            required: true,
            enum: ['SELF', 'PARENT', 'CHILD', 'GRANDCHILD']
        },
        children: [{type: mongoose.Schema.Types.ObjectId, ref: 'Person'}],
        email: String,
        address: String,
        city: String,
        state: String,
        zip: Number
    },
    {
        timestamps: true
    });

module.exports = mongoose.model('Person', PersonSchema);
