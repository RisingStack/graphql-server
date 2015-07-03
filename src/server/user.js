import mongoose from 'mongoose';

var UserSchema = new mongoose.Schema({
  name: {
    type: String
  },
  friends: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
});

var User = mongoose.model('User', UserSchema);

export default User;
