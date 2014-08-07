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
    return this.state.get('data');
  },

  isAuth: function(){
    return this.state.get('isAuth');
  }

},[
  
  [constants.LOGIN_SUCCESS, function (payload) {
    this.setState({
      data: payload,
      isAuth: true
    });
  }],


  [constants.LOGIN_FAIL, function (error) {
    this.setState({
      isAuth: false,
      error: error.message
    });
  }],

  [constants.LOGOUT_SUCCESS, function () {
    console.log("UserStore.logout.success");
    this.setState({
      data: null,
      isAuth: false
    });
    console.log("UserStore.logout.success.after");
  }],

  [constants.LOGOUT_FAIL, function () {
    console.log("UserStore.logout.fail");
    this.setState({
      data: null,
      isAuth: false
    });
  }],

  [constants.EDIT_DATA_SUCCESS, function(payload){
    var data = this.state.get('data');
    data.username = payload.username;
    this.setState({
      data: data
    });

  }]

]);