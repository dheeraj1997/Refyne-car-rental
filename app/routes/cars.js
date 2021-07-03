var carController = require('../controllers/carController');
var carBookingController = require('../controllers/carBookingController');
var async = require('async');


module.exports = function(router) {
    'use strict';
    // for getting a car by id, url /api/cars/:car_id
    let errResponse = {status: 0, message: 'Some error occurred'}
    router.route('/search')
        .get(async function(req, res, next) {
            try {
                let startTime = req.query.startTime;
                let endTime = req.query.endTime;
                let response = await carController.search(startTime, endTime);
                res.status(200).json(response);
            } catch (e) {
                console.error(e.message)
                res.status(500).json(errResponse)
            }
        })
    router.route('/calculate-price')
        .get(async function(req, res, next) {
            try {
                let id = req.query.carId;
                let startTime = req.query.startTime;
                let endTime = req.query.endTime;
                let response = await carController.calculatePrice(id, startTime, endTime);
                res.status(200).json(response);
            } catch (e) {
                console.error(e)
                res.status(500).json(errResponse)
            }
        })
    router.route('/:id/bookings')
        .get(async function(req, res, next) {
            try {
                let id = req.params.id;
                let response = await carBookingController.getBookingsByCarId(id);
                res.status(200).json(response);
            } catch (e) {
                console.error(e)
                res.status(500).json(errResponse)
            }
        })
    router.route('/book')
        .post(async function(req, res, next) {
            try {
                let carId = req.body.carId;
                let userId = req.body.userId;
                let startTime = req.body.startTime;
                let endTime = req.body.endTime;
                let response = await carBookingController.bookCar(carId, userId, startTime, endTime);
                res.status(200).json(response);
            } catch (e) {
                console.error(e)
                res.status(500).json(errResponse)
            }
        })

    router.route('/:id')
        .get(async function(req, res, next) {
            try {
                let uid = req.params.id;
                let response = await carController.getCarDetailsById(uid);
                res.status(200).json(response);
            } catch (e) {
                console.error(e);
                res.status(500).json(errResponse)
            }
        })
        .delete(async function(req, res, next) {
            try {
                let uid = req.params.id;
                let response = await carController.deleteCarById(uid);
                res.status(200).json(response);
            } catch (e) {
                console.error(e);
                res.status(500).json(errResponse)
            }
        });
    router.route('/')
        .post(Utils.validateCarDetails, async function(req, res, next) {
            try {
                let params = req.body
                let response = await carController.addCar(params);
                res.status(200).json(response);
            } catch (e) {
                console.error(e)
                res.status(500).json(errResponse)
            }
        })
        .put(async function(req, res, next) {
            try {
                let params = req.body
                let response = await carController.updateCar(params);
                res.status(200).json(response);
            } catch (e) {
                console.error(e)
                res.status(500).json(errResponse)
            }
        })
};