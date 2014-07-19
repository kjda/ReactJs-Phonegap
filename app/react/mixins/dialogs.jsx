var __ = require('../flux/stores/i18n')._

module.exports = {

	confirm: function(message, onConfirm){
    var noYesLabels = __('No') + ',' + __('Yes');
    navigator.notification.confirm(
      message,
      function(button){
        if( button == 2){
          !!onConfirm && onConfirm();
        }
      },             
      __('Confirm'),
      noYesLabels
      );
    return;
  },
  
  alert: function(message){
    navigator.notification.alert(message, function(){}, __('Alert'), __('Ok'));
  }

};