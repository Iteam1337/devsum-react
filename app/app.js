var React = require('react');
var Api = require('./utilities/Api');
var Loader = require('./react_components/Loader');
var Tweet = require('./react_components/Tweet');

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
    var socket = io.connect('http://devsum-twitter-worker.iteamdev.svc.tutum.io:3000');
    var faces = [];

    socket.on('face', function (face) {
      var image = face.tweet.images[0];

      if (image.id !== self.state.currentId || face.tweet.id !== self.state.currentTweet) {
        faces = [];
      }

      faces.push(face.face);

      // Find size of image
      var tweetImage = new Image();
      tweetImage.src = image.media_url;

      var imageSize = {
        width: tweetImage.width,
        height: tweetImage.height
      };

      self.setState({
        faces: faces,
        image: image.media_url,
        currentId: image.id,
        currentTweet: face.tweet.id,
        tweet: face.tweet,
        imageSize: imageSize
      });
    });
  },

  render: function () {
    if (!this.state.currentId) { return <Loader />; }

    var persons = this.state.faces.map(function (face, i) {
      return (
        <div className="person" key={'person' + i}>
          <div className="person__number">{i + 1}</div>
          <div className="person__sex" ref="sex">{face.attributes.gender}</div>
          <div className="person__age" ref="age">{face.attributes.age} years</div>
        </div>
      );
    });

    return (
      <div className="faces">
        <div className="photo">
          <div className="photo__wrap" style={this.state.imageSize}>
            <img src={this.state.image} ref="image" className="photo__image" />
            {this.state.faces.map(function (face, i) {
              return <div style={face.faceRectangle} key={'rectangle' + i} className="photo__face-rectangle" data-number={i + 1}></div>;
            })}
          </div>
        </div>
        <div className="stats">
          <Tweet tweet={this.state.tweet} />
          {persons}
        </div>
      </div>
    );
  }
});
