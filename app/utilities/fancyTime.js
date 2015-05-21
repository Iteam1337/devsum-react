module.exports = function (time) {
  var now = new Date.getTime();
  var minutes = (now - time) / 1000 * 60;

  if (minutes < 60) {
    return minutes > 1 ? minutes + ' minuter' : minutes + ' minut';
  } else if (minutes === 60) {
    return '1 timme';
  } else if (minutes > 60) {
    var hours = Math.floor(minutes / 60);
    var minutes = Math.round(minutes / 60 % 1 * 60);
    minutes = minutes === 1 ? minutes + ' minut' : minutes + ' minuter';
    return hours === 1 ? hours + ' timme ' + minutes : hours + ' timmar ' + minutes;
  }
};