var ReactFlux = require('react-flux');

var constants = require('../constants/user');

module.exports = ReactFlux.createStore({

  getInitialState: function () {
    return {
      data: {
        _id: 1,
        username: 'Max Mustermann'
      },
      isAuth: true
    };
  },

  getData: function(){
    return this.getState().data;
  },

  isAuth: function(){
    return this.getState().isAuth;
  }

},[
  
  [constants.USER_LOGIN_SUCCESS, function (payload) {
    this.setState({
      data: payload,
      isAuth: true
    });
  }],

  [constants.USER_LOGOUT_SUCCESS, function () {
    console.log("UserStore.logout.success");
    this.setState({
      data: null,
      isAuth: false
    });
  }],

  [constants.USER_EDIT_DATA_SUCCESS, function(payload){
    var data = this.getState().data;
    data.username = payload.username;
    this.setState({
      data: data
    });

  }]

]);