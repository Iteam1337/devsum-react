var React = require('react');

module.exports = React.createClass({
  displayName: 'Loader',

  render: function () {
    return (
      <div className="loader">
        <p className="loader__desc">
          Tweet an image of a face and the hashtag  
          <span className="hashtag"> #devsum15</span>
        </p>

        Ready to receive Tweets...
      </div>
    );
  }
});