import {Schema, model} from 'mongoose';

var UserSchema = new Schema({
  name: {
    type: String
  },
  friends: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
});

export default model('User', UserSchema);
