var Utils = module.exports = {};



Utils.minLenght = function(pass, mn) {
   return pass.length >= mn;
}

Utils.makeSalt = function(pass, mn) {
   var text = "";
   var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

   for (var i = 0; i < 32; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

   return text;
}


Utils.validateSignup = function(req, res, next) {
   req.checkBody("email", messages.users.post.email).notEmpty().isEmail();
   req.checkBody("password", messages.users.post.password).notEmpty().isLength({
      min: 6,
      max: 15
   });
   req.checkBody("name", messages.users.post.name).optional().isLength({
      min: 3,
      max: 50
   });

   var errors = req.validationErrors();
   if (!errors) next();
   else {
      errors.status = 422;
      next(errors);
   }
}


Utils.validateSignIn = function(req, res, next) {
   req.checkBody("email", messages.users.post.email).notEmpty().isEmail();
   req.checkBody("password", messages.users.post.password).notEmpty().isLength({
      min: 6,
      max: 15
   });

   var errors = req.validationErrors();
   if (!errors) next();
   else {
      errors.status = 422;
      next(errors);
   }
}

Utils.validateCarDetails = function(req, res, next) {
    req.checkBody("carLicenseNumber", messages.cars.post.carLicenseNumber).notEmpty();
    req.checkBody("manufacturer", messages.cars.post.manufacturer).notEmpty()
    req.checkBody("model", messages.cars.post.model).notEmpty()
    req.checkBody("basePrice", messages.cars.post.basePrice).notEmpty()
    req.checkBody("pph", messages.cars.post.pph).notEmpty()

    var errors = req.validationErrors();
    if (!errors) next();
    else {
       errors.status = 422;
       next(errors);
    }
}

Utils.getDuration = function(d1, d2) {
    d1 = new Date(Date.parse(d1));
    d2 = new Date(Date.parse(d2));
    diffEpoch = Math.abs(d2 - d1);

    return {
        getHours: function(){
            return Math.ceil(diffEpoch/(60 * 60 * 1000));
        },
        getMinutes: function(){
            return Math.ceil(diffEpoch/(60*1000));
        },
        getMilliseconds: function() {
            return Math.ceil(diffEpoch);
        }
    };
}