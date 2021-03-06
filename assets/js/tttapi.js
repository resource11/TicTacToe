'use strict';

// api HTTP requests/responses

var tttapi = {
  gameWatcher: null,
  // ttt: 'http://tic-tac-toe.wdibos.com',
  ttt: 'https://aqueous-atoll-85096.herokuapp.com',

  ajax: function(config, cb) {
    $.ajax(config).done(function(data, textStatus, jqxhr) {
      cb(null, data);
    }).fail(function(jqxhr, status, error) {
      cb({jqxher: jqxhr, status: status, error: error});
    });
  },

  register: function register(credentials, callback) {
    this.ajax({

      // url: 'http://httpbin.org/post',
      url: this.ttt + '/sign-up',
      method: 'POST',
      contentType: false,
      processData: false,
      data: credentials,
      dataType: 'json',
    }, callback);
  },

  login: function login(credentials, callback) {
    this.ajax({
      url: this.ttt + '/sign-in',
      method: 'POST',
      contentType: false,
      processData: false,
      data: credentials,
      dataType: 'json',
    }, callback);
  },

  //Authenticated api actions
  listGames: function (token, callback) {
    this.ajax({
      method: 'GET',
      url: this.ttt + '/games',
      headers: {
        Authorization: 'Token token=' + token
      },
      dataType: 'json'
      }, callback);
  },

  createGame: function (token, callback) {
    this.ajax({
      method: 'POST',
      url: this.ttt + '/games',
      headers: {
        Authorization: 'Token token=' + token
      },
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify({}),
      dataType: 'json',
    }, callback);
  },

  showGame: function (id, token, callback) {
    this.ajax({
      method: 'GET',
      url: this.ttt + '/games/' + id,
      headers: {
        Authorization: 'Token token=' + token
      },
      dataType: 'json'
    }, callback);
  },

  joinGame: function (id, token, callback) {
    this.ajax({
      method: 'PATCH',
      url: this.ttt + '/games/' + id,
      headers: {
        Authorization: 'Token token=' + token
      },
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify({}),
      dataType: 'json'
    }, callback);
  },

  markCell: function (id, data, token, callback) {
    this.ajax({
      method: 'PATCH',
      url: this.ttt + '/games/' + id,
      headers: {
        Authorization: 'Token token=' + token
      },
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(data),
      dataType: 'json'
    }, callback);
  },


  watchGame: function (id, token) {
    console.log(id + '' + token);
    var url = this.ttt + '/games/' + id + '/watch';
    var auth = {
      Authorization: 'Token token=' + token
    };
    this.gameWatcher = resourceWatcher(url, auth); //jshint ignore: line
    return this.gameWatcher;
  }

  // // this method ends a game if there's a winner or Cat's Game
  // gameOver: function (id, data, token, over, callback) {
  //   this.ajax({
  //     method: 'PATCH',
  //     url: this.ttt + '/games/' + id,
  //     headers: {
  //       Authorization: 'Token token=' + token,
  //     },
  //     contentType: 'application/json; charset=utf-8',
  //     // looking to send data
  //     data: JSON.stringify(data),
  //     dataType:'json'
  //   }, callback);
  // }

};

