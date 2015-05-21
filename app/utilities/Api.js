var q = require('q');

var Api = {
  core: function (method, url, data) {
    var deferred = q.defer();

    var client = new XMLHttpRequest();

    client.open(method, url, true);

    client.onreadystatechange = function () {
      if (this.readyState === 4) {
        if (this.status === 200) {
          var result = JSON.parse(client.responseText);
          deferred.resolve(result);
        } else {
          deferred.reject({ error: this.statusText });
        }
      }
    };

    client.send(JSON.stringify(data));

    return deferred.promise;
  },

  get: function (url) {
    return Api.core('get', url, '');
  },

  post: function (url, data) {
    return Api.core('post', url, data);
  }
};

module.exports = Api;