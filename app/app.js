var React  = require('react');
var Api    = require('./utilities/Api');
var Loader = require('./react_components/Loader');
var Tweet  = require('./react_components/Tweet');
var Person = require('./react_components/Person')

module.exports = React.createClass({
  displayName: 'App',
  
  getInitialState: function () {
    return {
      faces: [],
      image: '',
      currentId: null,
      currentTweet: null,
      tweet: {},
      imageSize: {}
    }
  },

  componentDidMount: function () {
    var self = this;
    var socket = io.connect('http://worker.devsum.iteamdev.svc.tutum.io:3000');
    var faces = [];

    socket.on('face', function (face) {
      var image = face.tweet.images[0];

      if (image.id !== self.state.currentId || face.tweet.id !== self.state.currentTweet) {
        faces = [];
      }

      faces.push(face.face);

      self._setImageSize(image.media_url);

      self.setState({
        faces: faces,
        image: image.media_url,
        currentId: image.id,
        currentTweet: face.tweet.id,
        tweet: face.tweet
      });
    });
  },

  _setImageSize: function (url) {
    var self = this;
    var tweetImage = new Image();
    tweetImage.src = url;

    setTimeout(function () {
      var imageSize = {
        width: tweetImage.width,
        height: tweetImage.height
      };

      if (imageSize.height === 0 || imageSize.width === 0) {
        self._setImageSize(url);
      } else {
        self.setState({
          imageSize: imageSize
        });
      }
    }, 300);
  },

  render: function () {
    if (!this.state.currentId) { return <Loader />; }

    return (
      <div className="faces">
        <div className="photo">
          <div className="photo__wrap" style={this.state.imageSize}>
            <img src={this.state.image} ref="image" className="photo__image" />
            {this.state.faces.map(function (face, i) {
              var sex = face.attributes.gender === 'male' ? 'M' : 'F';
              return <div style={face.faceRectangle} key={'rectangle' + i} className="photo__face-rectangle" data-number={sex + ' - ' + face.attributes.age}></div>;
            })}
          </div>
        </div>
        <div className="stats">
          <Tweet tweet={this.state.tweet} />
        </div>
      </div>
    );
  }
});
