var carRepo = require('../repos/carRepo')
var carBookingRepo = require('../repos/carBookingRepo')

module.exports = {
    getCarDetailsById: async (carId) => {
        try {
            let response = {
                status: 0,
                message: 'Fetch car details failed'
            }
            if (!carId) {
                return response
            } else {
                let carDetails = await carRepo.getCarDetailsById(carId);
                if (!carDetails) {
                    response.message = messages.httpCodes(404);
                } else {
                    response.status = 1;
                    response.message = 'Car details fetch success';
                    response.data = carDetails;
                }
                return response;
            }
        } catch (e) {
            throw e;
        }
    },
    addCar: async (carDetails) => {
        try {
            let response = {
                status: 0,
                message: 'Add car details failed'
            }
            if (!carDetails) {
                return response
            } else {
                let result = await carRepo.addCarDetails(carDetails);
                if (!result) {
                    response.message = 'Some error occurred while adding car';
                } else {
                    response.status = 1;
                    response.message = 'Car details added successfully';
                    response.data = result;
                }
                return response;
            }
        } catch (e) {
            throw e;
        }
    },
    updateCar: async (carDetails) => {
        try {
            let response = {
                status: 0,
                message: 'Add car details failed'
            }
            if (!carDetails) {
                return response
            } else if(!carDetails.id) {
                response.message = 'No id provided';
                return response;
            } else {
                let result = await carRepo.updateCarDetailsById(carDetails);
                if (!result) {
                    response.message = 'Some error occurred while updating car';
                } else {
                    response.status = 1;
                    response.message = 'Car details updated successfully';
                    response.data = result;
                }
                return response;
            }
        } catch (e) {
            throw e;
        }
    },
    deleteCarById: async (carId) => {
        try {
            let response = {
                status: 0,
                message: 'Add car details failed'
            }
            if (!carId) {
                return response
            } else {
                let result = await carRepo.deleteCarById(carId);
                if (!result) {
                    response.message = 'Some error occurred while deleting car';
                } else {
                    response.status = 1;
                    response.message = 'Car deleted successfully';
                }
                return response;
            }
        } catch (e) {
            throw e;
        }
    },
    calculatePrice: async (carId, startTime, endTime) => {
        try {
            let response = {
                status: 0,
                message: 'Calculate price failed'
            }
            if (!carId || !startTime || !endTime) {
                return response
            } else {
                let carDetails = await carRepo.getCarDetailsById(carId);
                if (!carDetails) {
                    response.message = 'Some error occurred while calculating price';
                } else {
                    let timeDiff = Utils.getDuration(startTime, endTime);
                    let basePrice = carDetails.basePrice;
                    let pph = carDetails.pph;
                    let price = basePrice + timeDiff.getHours() * pph;

                    response.status = 1;
                    response.message = 'Price calculated successfully';
                    response.data = {
                        price: price
                    }
                }
                return response;
            }
        } catch (e) {
            throw e;
        }
    },
    search: async (startTime, endTime) => {
        try {
            let response = {
                status: 0,
                message: 'Search failed'
            }
            if (!startTime || !endTime) {
                return response
            } else {
                let bookedCarIds = await carBookingRepo.getCarBookingsByTimeDuration(startTime, endTime);
                let availableCars = await carRepo.getCarIdsExcludingBooked(bookedCarIds);
                if (!availableCars) {
                    response.message = 'Some error occurred while fetching available cars';
                } else {
                    response.status = 1;
                    response.message = 'Available cars fetched successfully';
                    response.data = availableCars;
                }
                return response;
            }
        } catch (e) {
            throw e;
        }
    }
}