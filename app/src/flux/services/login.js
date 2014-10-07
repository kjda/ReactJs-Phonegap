var Promise = require('promise');

//dummy login service
module.exports = {

  login: function (email, password) {

    var promise = new Promise(function(resolve, reject){
      setTimeout(function(){
        resolve({
          _id: 1, 
          email: email,
          username: 'Max Mustermann 2'
        });
      }, 0)
    });
    
    return promise;
  },

  logout: function(){
  	return true;
  }

};