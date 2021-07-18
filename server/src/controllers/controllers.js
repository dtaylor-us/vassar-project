const Person = require('../db/person.model.js');

const saySomething = (req, res, next) => {
    res.status(200).json({
        body: 'Hello from the server!'
    });
};


function validateRequest(req) {
    const messages = [];

    if (!req.body.firstName) {
        messages.push("Person first name can not be empty");
    }
    if (!req.body.lastName) {
        messages.push("Person last name can not be empty");
    }
    if (!req.body.sister) {
        messages.push("Must specify which sister this person is related to");
    }
    if (!req.body.relationship) {
        messages.push("Must specify which sister this person is related to");
    }
    if (messages.length > 0) {
        return messages.pop();
    }

}

// Create and Save a new Person
const create = (req, res) => {
    // Validate request
    const err = validateRequest(req);
    if (err) {
        return res.status(400).send({
            message: err
        });
    }

    // Create a Person
    const person = new Person(
        {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            sister: req.body.sister,
            relationship: req.body.relationship,
            children: req.body.children,
            email: req.body.email,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            zip: req.body.zip
        });

    // Save Person in the database
    person.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Person."
        });
    });
};

// Retrieve and return all persons from the database.
const findAll = (req, res) => {
    Person.find()
        .then(persons => {
            res.send(persons);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving person."
        });
    });
};

// Find a single person with a personId
const findOne = (req, res) => {
    Person.findById(req.params.personId)
        .then(person => {
            if (!person) {
                return res.status(404).send({
                    message: "Person not found with id " + req.params.personId
                });
            }
            res.send(person);
        }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Person not found with id " + req.params.personId
            });
        }
        return res.status(500).send({
            message: "Error retrieving person with id " + req.params.personId
        });
    });
};

// Update a person identified by the personId in the request
const update = (req, res) => {
    // Validate Request
    const err = validateRequest(req);
    if (err) {
        return res.status(400).send({
            message: err
        });
    }
    // Find person and update it with the request body
    Person.findByIdAndUpdate(req.params.personId, {
        title: req.body.title || "Untitled Person",
        content: req.body.content
    }, {new: true})
        .then(person => {
            if (!person) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.personId
                });
            }
            res.send(person);
        }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.personId
            });
        }
        return res.status(500).send({
            message: "Error updating person with id " + req.params.personId
        });
    });
};

// Delete a person with the specified personId in the request
const deletePerson = (req, res) => {
    Person.findByIdAndRemove(req.params.personId)
        .then(person => {
            if (!person) {
                return res.status(404).send({
                    message: "Person not found with id " + req.params.personId
                });
            }
            res.send({message: "Person deleted successfully!"});
        }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Person not found with id " + req.params.personId
            });
        }
        return res.status(500).send({
            message: "Could not delete person with id " + req.params.personId
        });
    });
};

module.exports = {
    saySomething,
    create,
    findAll,
    findOne,
    update,
    deletePerson,
};
