var constants = require('../constants/user');
var Fluxy = require('fluxy');
module.exports = Fluxy.createStore({
  getInitialState: function () {
    return {
      user: null,
      isAuth: false
    };
  },

  isAuth: function(){
    return this.get('isAuth');
  },
  
  actions: [
  [constants.LOGIN_COMPLETED, function (user) {
    this.set('user', user);
    this.set('isAuth', true);
  }],
  [constants.LOGOUT_COMPLETED, function () {
    this.set('user', null);
    this.set('isAuth', false);
  }],
  ]
});