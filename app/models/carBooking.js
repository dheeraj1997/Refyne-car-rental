var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CarBookingSchema = new Schema({
    carId: {
        type: { String, index: true },
        required: [true, 'carId is required']
    },
    userId: {
        type: { String, index: true },
        required: [true, 'userId is required'],
        default: 'Unknown'
    },
    startTime: {
        type: { Date, index: true },
        required: [true, 'startTime is required'],
        default: 'Unknown'
    },
    endTime: {
        type: { Date, index: true },
        required: [true, 'endTime is required'],
        default: 0.0
    }
}, {
   timestamps: true
});

const CarBooking = mongoose.model('carBooking', CarBookingSchema, 'carBookings');

module.exports = CarBooking;