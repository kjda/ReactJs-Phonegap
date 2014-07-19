/** @jsx React.DOM */
var React = require('react');

module.exports = React.createClass({
  
  propTypes: {
    paragraphs: React.PropTypes.number.isRequired
  },
  
  mainSentence:  "lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim praesent elementum facilisis leo, vel fringilla est ullamcorper eget nulla facilisi etiam dignissim diam quis enim lobortis scelerisque fermentum dui faucibus in ornare quam viverra orci sagittis eu volutpat odio facilisis mauris sit amet massa vitae tortor condimentum lacinia quis vel eros donec ac odio tempor orci dapibus ultrices in iaculis nunc sed augue lacus, viverra vitae congue eu, consequat ac felis donec et odio pellentesque diam volutpat commodo sed egestas egestas fringilla phasellus faucibus scelerisque eleifend donec pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae elementum curabitur vitae nunc sed velit dignissim sodales ut eu sem integer vitae justo eget magna fermentum iaculis eu non diam phasellus vestibulum lorem sed risus ultricies tristique nulla aliquet enim tortor, at auctor urna nunc id cursus metus aliquam eleifend mi in nulla posuere sollicitudin aliquam ultrices sagittis orci, a scelerisque purus semper eget duis at tellus at urna condimentum mattis pellentesque id nibh tortor, id aliquet lectus proin nibh nisl, condimentum id venenatis a, condimentum vitae sapien pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas sed tempus, urna et pharetra pharetra, massa massa ultricies mi, quis hendrerit dolor magna eget est lorem ipsum dolor sit amet, consectetur adipiscing elit pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas integer eget aliquet nibh praesent tristique magna sit amet purus gravida quis blandit turpis cursus in hac habitasse platea dictumst quisque sagittis, purus sit amet volutpat consequat, mauris nunc congue nisi, vitae suscipit tellus mauris a diam maecenas sed enim ut sem viverra aliquet eget sit amet tellus cras adipiscing enim eu turpis egestas pretium aenean pharetra, magna ac placerat vestibulum, lectus mauris ultrices eros, in cursus turpis massa tincidunt dui ut ornare lectus sit amet est placerat in egestas erat imperdiet sed euismod nisi porta lorem mollis aliquam ut porttitor leo a diam sollicitudin tempor id eu nisl nunc mi ipsum, faucibus vitae aliquet nec, ullamcorper sit amet risus nullam eget felis eget nunc lobortis mattis aliquam faucibus purus in massa tempor nec feugiat nisl pretium fusce id velit ut tortor pretium viverra suspendisse potenti nullam ac tortor vitae purus faucibus ornare suspendisse sed nisi lacus, sed viverra tellus in hac habitasse platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at augue eget arcu dictum varius duis at consectetur lorem",

  createParagraph: function(){
    var min = 150;
    var max = min + Math.floor(Math.random()*500);
    var length = Math.floor(Math.random() * (max - min + 1)) + min;
    var rnd = parseInt(Math.random()*50);
    var paragraph = this.mainSentence.substr(rnd, length);
    paragraph = paragraph.substr(paragraph.indexOf(' '));
    paragraph = paragraph.substr(0, paragraph.lastIndexOf(' '));
    paragraph += '.';
    return paragraph
  },

  render: function(){
    var paragraphs = [];
    for(var i=0; i < this.props.paragraphs; i++){
      var paragraph = this.createParagraph();
      paragraphs.push(<p key={i}>{paragraph}</p> );
    } 
    return(
      <div>{paragraphs}</div>
      );
  }

});
