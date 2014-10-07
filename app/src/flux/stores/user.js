var ReactFlux = require('react-flux');
var constants = require('../constants/user');

var Store = ReactFlux.createStore({

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

});


Store.addHandler(constants.LOGIN, {
  success: function(payload){
    this.parent.setState({
      data: payload,
      isAuth: true
    });
  },
  fail: function(){
    this.parent.setState({
      isAuth: false,
      error: error.message
    });
  }
});

Store.addHandler(constants.LOGOUT, {
  success: function(payload){
    this.parent.setState({
      data: null,
      isAuth: false
    });
  },
  fail: function(){
    
  }
});


Store.addHandler(constants.EDIT_DATA, {

  getInitialState: function(){
    return {
      isSaving: false,
      success: false
    };
  },

  before: function(){
    this.setState({
      isSaving: true,
      success: false
    });
  },

  after: function(){
    this.setState({
      isSaving: false
    });
  },

  success: function(payload){
    var data = this.parent.get('data');
    data.username = payload.username;
    this.parent.setState({
      data: data
    });
    this.setState({
      success: true
    });
  },
  
  fail: function(){
    
  }
});

module.exports = Store;