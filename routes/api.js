const express = require('express');
const router = express.Router();
const Member = require('../models/member');

router.get('/members', function (req, res, next) {
    Member.find({}).then(function (members) {
        res.send(members);
    }).catch(next);
});

router.post('/members', function (req, res, next) {
    Member.create(req.body).then(function (member) {
        res.send(member);
    }).catch(next);
});


router.put('/members/:id', function (req, res, next) {
    Member.findOneAndUpdate({_id: req.params.id}, req.body).then(
        member => {
            Member.findOne({_id: req.params.id}).then(member => {
                res.send(member);
            });
        }
    );
});

router.delete('/members/:id', function (req, res, next) {
    Member.findOneAndDelete({_id: req.params.id}).then(function (member) {
        res.send(member);
    });
});

module.exports = router;
