var User = require("../models/user");
var randomstring = require("randomstring");
var async = require('async');
var carBookingController = require('../controllers/carBookingController');


module.exports = function(router) {
   'use strict';
   // for getting a user by id, url /api/users/:user_id
   router.route('/:id')
      .get(function(req, res, next) {
         var uid = req.params.id;
         User.findOne({
            _id: uid
         }).then(function(user) {
            if (!user) {
               next({
                  status: 404,
                  message: messages.httpCodes(404)
               });
            } else {
               res.json({
                  error: user ? false : true,
                  data: user
               });
            }
         })

      });
   router.route('/')
      .get(auth.authenticate(), auth.authCheck, function(req, res, next) {
         res.json({
            error: false,
            data: res.locals.user
         });
      }).post(Utils.validateSignup, function(req, res, next) {
         var newUser = new User({
            email: req.body.email,
            password: req.body.password,
            name: req.body.name,
            contact: req.body.contact
         });
         newUser.save(function(err) {
            try {
               if (err) {
                  err.status = 409;
                  next(err);
               } else {
                  res.status(201);
                  res.json({
                     error: false,
                     data: newUser
                  });
               }
            } catch (e) {
               console.log(e.message);
               next(e);
            };
         });
      });
    router.route('/:id/bookings')
      .get(async function(req, res, next) {
        try {
            let id = req.params.id;
            let response = await carBookingController.getBookingsByUserId(id);
            res.status(200).json(response);
        } catch (e) {
            console.error(e)
            res.status(500).json({message: 'Some error occurred'})
        }
      });
};