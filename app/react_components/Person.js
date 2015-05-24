var React = require('react');

module.exports = React.createClass({
  displayName: 'Person',

  propTypes: {
    person: React.PropTypes.object.isRequired,
    number: React.PropTypes.number.isRequired
  },

  render: function () {
    return (
      <div className="person">
        <div className="person__number">{this.props.number}</div>
        <div className="person__sex" ref="sex">{this.props.person.attributes.gender}</div>
        <div className="person__age" ref="age">{this.props.person.attributes.age} years</div>
      </div>
    );
  }
});