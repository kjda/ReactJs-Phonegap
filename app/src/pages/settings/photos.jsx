/** @jsx React.DOM */
var React = require('react');
var IScroll = require('../../components/iscroll');
var Navigation = require('./nav');
var __ = require('../../flux/stores/lang')._
var AppStateActions = require('../../flux/actions/appState');


module.exports = React.createClass({
  getInitialState: function(){
    return {
      data: this.props.user
    }
  },
  componentDidMount: function(){
    AppStateActions.setTitle(__('settings.photos'));
  },

  chnageState: function(field, value){
    return function(){
      var data = this.state.data;
      data[field] = value;
      this.setState({data: data});
    }.bind(this);
  },

  upload: function(imageURI){
    this.refs.img.getDOMNode().src = "data:image/jpeg;base64," + imageURI;
    return false;
  },
  camera: function(){
    navigator.camera.getPicture(function(imageURI){
      this.upload(imageURI);
    }.bind(this), function(message) {
      setTimeout(function(){
        alert(message);
      }, 0);
    }.bind(this), {
      quality: 100,
      allowEdit: true,
      destinationType: navigator.camera.DestinationType.DATA_URL,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 400,
      targetHeight: 400,
      correctOrientation: true,
      saveToPhotoAlbum: false
    });
    return false;
  },
  gallery: function(){
    navigator.camera.getPicture(function(imageURI){
      this.upload(imageURI)
      
    }.bind(this), function(message) {
      setTimeout(function(){
        alert(message);
      }, 0);
    }.bind(this), {
      quality: 80,
      allowEdit: true,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
      mediaType: Camera.MediaType.Picture,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 400,
      targetHeight: 400,
      correctOrientation: true,
      saveToPhotoAlbum: false,
    });
    return false;
  },

  render: function() {

    return (
      <div>
      <Navigation />
      <div className="p10">
      <br />
      <a href="#" role="upCamera" onClick={this.camera}>Camera</a>
      <br /><br />
      <a href="#" role="upGallery" onClick={this.gallery}>Gallery</a>
      <br />
      <img ref="img" style={{width:'99%'}} />
      </div>
      </div>
      );
  }
});