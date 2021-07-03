var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CarSchema = new Schema({
    carLicenseNumber: {
        type: { String, index: true },
        unique: [true, 'License Already Exists'],
        required: [true, 'License is required']
    },
    manufacturer: {
        type: String,
        required: [true, 'Manufacturer is required'],
        default: 'Unknown'
    },
    model: {
        type: String,
        required: [true, 'Model is required'],
        default: 'Unknown'
    },
    basePrice: {
        type: Number,
        required: [true, 'BasePrice is required'],
        default: 0.0
    },
    pph: {
        type: Number,
        required: [true, 'Price per hour is required']
}
}, {
   timestamps: true
});

const Car = mongoose.model('car', CarSchema, 'cars');

module.exports = Car;

Car.get = function(id) {
    return new Promise((resolve, reject) => {
        Car.findOne({
            _id: id
        }).lean().then(function(car) {
            if (!car) {
                reject({
                    status: 404,
                    message: messages.httpCodes(404)
                });
            } else {
                resolve(car);
           }
        }, function(err) {
           reject(err)
        })
    })
};
