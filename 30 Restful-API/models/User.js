const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt')
const saltRounds = 10;

const userSchema = new Schema({
  email: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true }, 
  token: String
},
  {
    timestamps: true
  });

userSchema.pre('save', function (next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  const hash = bcrypt.hashSync(user.password, saltRounds);

  user.password = hash
  next()
});

userSchema.pre('findOneAndUpdate', function (next) {

  this._update.password = bcrypt.hashSync(this._update.password, saltRounds)

  next()
});

userSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

module.exports = model('User', userSchema)