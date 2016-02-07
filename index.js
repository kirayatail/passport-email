'use strict';

var passport = require('passport-strategy'),
    util = require('util');

function Strategy(verify) {
  passport.Strategy.call(this);

  this.name = 'email';
  this._verify = verify;
}

util.inherits(Strategy, passport.Strategy);

Strategy.protoype.authenticate = function(req) {
  var token;
  if((req.body && !req.body.token) || !req.params.token) {
    return this.fail({
      message: 'No valid token';
    })
  }

  if(req.body && req.body.token) {
    token = req.body.token;
  } else {
    token = req.params.token;
  }

  function verified(err, user, info) {
    if(err) { return self.error(err); }
    if(!user) { return self.fail(info); }
    self.success(user, info);
  }

  self._verify(token, verified);
}
