// middleware/passport-strategies.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Farm = require('../models/farm'); // Đảm bảo import mô hình Farm

// Local Strategy cho xác thực bằng tên đăng nhập và mật khẩu
passport.use(new LocalStrategy({
  usernameField: 'email', // Sử dụng email cho tên đăng nhập
  passwordField: 'password',
}, (email, password, done) => {
  Farm.findOne({ email }, (err, farm) => {
    if (err) return done(err);
    if (!farm || !farm.verifyPassword(password)) {
      return done(null, false, { message: 'Sai tên đăng nhập hoặc mật khẩu.' });
    }
    return done(null, farm);
  });
}));

// JWT Strategy cho xác thực bằng JSON Web Tokens
passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'your-secret-key', // Thay thế bằng khóa bí mật của bạn
}, (payload, done) => {
  Farm.findById(payload.sub, (err, farm) => {
    if (err) return done(err, false);
    if (farm) return done(null, farm);
    return done(null, false);
  });
}));
