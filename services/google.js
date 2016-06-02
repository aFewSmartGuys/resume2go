var passport =  require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
passport.use(new GoogleStrategy({
    clientID: "4943757847-ie0ofih2k0kvuk4fia7ksm2ilv07kbk8.apps.googleusercontent.com",
    clientSecret: "lOZ4I_-hvwEkd0j2cUO4Knno",
    callbackURL: "http://localhost/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
       User.findOrCreate({ googleId: profile.id }, function (err, user) {
         return done(err, user);
       });
  }
));

module.exports = passport;
