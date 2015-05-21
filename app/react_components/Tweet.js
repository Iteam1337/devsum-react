var React = require('react');
var moment = require('moment');

var time = require('../utilities/fancyTime');

module.exports = React.createClass({
  displayName: 'Tweet',

  propTypes: {
    tweet: React.PropTypes.object.isRequired
  },

  render: function () {
    var tweet = this.props.tweet;

    var user = tweet.user ? <div className="tweet__user">@{tweet.user.screen_name}</div> : null;

    return (
      <div className="tweet">
        <div className="fa fa-twitter" />
        <div className="tweet__content">
          {user}
          <div className="tweet__message">{tweet.text}</div>
          <div className="tweet__time">{moment(tweet.timestamp).fromNow()}</div>
        </div>
      </div>
    );
  }
});