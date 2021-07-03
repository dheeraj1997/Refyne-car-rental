var carBookingRepo = require('../repos/carBookingRepo')
const carRepo = require('../repos/carRepo')
const userRepo = require('../repos/userRepo')

module.exports = {
    bookCar: async (carId, userId, startTime, endTime) => {
        try {
            let response = {
                status: 0,
                message: 'Car booking failed'
            }
            if (!carId || !userId || !startTime || !endTime) {
                return response
            } else {
                let carDetails = await carRepo.getCarDetailsById(carId);
                let userDetails = await userRepo.getUserById(carId);
                if (!carDetails) {
                    response.message = "Car doesn't exist";
                    return response;
                }
                if (!userDetails) {
                    response.message = "User doesn't exist";
                    return response;
                }
                let carBookingDetails = await carBookingRepo.getCarBookingsByCarIdAndTime(
                    carId, startTime, endTime);
                if (carBookingDetails.length > 0) {
                    response.message = 'Car not available for this duration';
                } else {
                    let result = await carBookingRepo.bookCar(carId, userId, startTime, endTime);
                    if (!result) {
                        response.message = 'Some error occurred while booking car';
                    } else {
                        response.status = 1;
                        response.message = 'Car booked successfully';
                        response.data = result;
                    }
                }
                return response;
            }
        } catch (e) {
            throw e;
        }
    },
    getBookingsByCarId: async (carId) => {
        try {
            let response = {
                status: 0,
                message: 'Fetch bookings failed'
            }
            if (!carId) {
                return response
            } else {
                let carBookings = await carBookingRepo.getCarBookingsByCarId(carId);
                if (!carBookings) {
                    response.message = 'Some error occurred while fetching car bookings';
                } else {
                    response.status = 1;
                    response.message = 'Bookings fetched successfully';
                    response.data = carBookings
                }
                return response;
            }
        } catch (e) {
            throw e;
        }
    },
    getBookingsByUserId: async (userId) => {
        try {
            let response = {
                status: 0,
                message: 'Fetch bookings failed'
            }
            if (!userId) {
                return response
            } else {
                let carBookings = await carBookingRepo.getCarBookingsByUserId(userId);
                if (!carBookings) {
                    response.message = 'Some error occurred while fetching car bookings';
                } else {
                    response.status = 1;
                    response.message = 'Bookings fetched successfully';
                    response.data = carBookings
                }
                return response;
            }
        } catch (e) {
            throw e;
        }
    },
}