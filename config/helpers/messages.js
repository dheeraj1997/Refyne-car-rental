var messages = {

}


//Messages for [POST] /api/users
messages.users = {
   post: {
      email: "Enter a valid email address.",
      name: "Please Use atleat 3 characters for name",
      password: "Password Lenght should be between 6 and 15",
      role: "Role can be 1, 2 or 3",
      contact: "contact is required"
   }
};

//Messages for [POST] /api/users
messages.cars = {
    post: {
        carLicenseNumber: "Please provide a license number.",
        manufacturer: "Please provide a manufacturer",
        model: "Please provide a model",
        basePrice: "Please provide a basePrice",
        pph: "Please provide a pph"
    }
};

// Messages for /api/devices



// messages.devices = {
//     post: {
//         email: "Enter a valid email address.",

//     }
// };

//Messages for Status Codes
messages.httpCodes = function(code) {
   var msg = null;
   switch (code) {
      case 403:
         msg = 'You have no right to update this resource.';
         break;
      case 404:
         msg = 'Resource Not Found.';
         break;
      case 401:
         msg = 'Authentication failed.User not found.';
         break;
      case 406:
         msg = 'Please Use a Query. Data will be too large.'
         break;
      default:
         msg = "There was some error.";
   }
   return msg;

}

module.exports = messages;