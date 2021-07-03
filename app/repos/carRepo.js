var Car = require("../models/car");

module.exports = {
    getCarDetailsById: (id) => {
        try {
            return Car.findOne({ _id: id })
        } catch (e) {
            throw e;
        }
    },
    addCarDetails: (carDetails) => {
        try {
            let newCar = new Car(carDetails);
            return newCar.save(function(err) {
                if (err) {
                    console.error(err);
                    return null;
                } else {
                    return newCar;
                }
            });
        } catch (e) {
            throw e;
        }
    },
    updateCarDetailsById: async (carDetails) => {
        try {
            let allowedCarParams = ["carLicenseNumber", "manufacturer", "model", "basePrice", "pph"];
            let car = await Car.findOne({ _id: carDetails.id });
            if (car) {
                delete carDetails.id;
                Object.keys(carDetails).forEach(key => {
                    if (allowedCarParams.includes(key)) {
                        car[key] = carDetails[key]
                    }
                });
                return car.save().catch(e => {console.log(e.message);});
            }
            return null;
        } catch (e) {
            throw e;
        }
    },
    deleteCarById: (id) => {
        try {
            return Car.deleteOne({ _id: id });
        } catch (e) {
            throw e;
        }
    },
    getCarIdsExcludingBooked: (bookedCarIds) => {
        try {
            return Car.find({carId: {$nin: bookedCarIds}});
        } catch (e) {
            throw e;
        }
    }
}