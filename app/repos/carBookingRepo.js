var CarBookings = require("../models/carBooking");

module.exports = {
    bookCar: (carId, userId, startTime, endTime) => {
        try {
            let carBookingDetails = new CarBookings({
                carId: carId,
                userId: userId,
                startTime: startTime,
                endTime: endTime
            });
            return carBookingDetails.save(function(err) {
                if (err) {
                    console.error(err);
                    return null;
                } else {
                    return carBookingDetails;
                }
            });
        } catch (e) {
            throw e;
        }
    },
    getCarBookingsByCarId: (id) => {
        try {
            return CarBookings.find({carId: id});
        } catch (e) {
            throw e;
        }
    },
    getCarBookingsByUserId: (id) => {
        try {
            return CarBookings.find({userId: id});
        } catch (e) {
            throw e;
        }
    },
    getCarBookingsByCarIdAndTime: (id, startTime, endTime) => {
        try {
            return CarBookings.find({ 
                carId: id, 
                $or: [
                    {
                        $and: [
                            { startTime: {$gte: startTime} },
                            { startTime: {$lte: endTime} }
                        ]
                    },{
                        $and: [
                            { endTime: {$gte: startTime} },
                            { endTime: {$lte: endTime} }
                        ]
                    }
                ]
            });
        } catch (e) {
            throw e;
        }
    },
    getCarBookingsByTimeDuration: (startTime, endTime) => {
        try {
            return CarBookings.find({
                $or: [
                    {
                        $and: [
                            { startTime: {$gte: startTime} },
                            { startTime: {$lte: endTime} }
                        ]
                    },{
                        $and: [
                            { endTime: {$gte: startTime} },
                            { endTime: {$lte: endTime} }
                        ]
                    }
                ]
            }).select({carId: 1, _id:0});
        } catch (e) {
            throw e;
        }
    }
}