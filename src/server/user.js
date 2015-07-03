import {Schema, model} from 'mongoose';
import mongoose from 'mongoose';

var UserSchema = new Schema({
  name: {
    type: String
  },
  friends: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
});

var User = model.call(mongoose, 'User', UserSchema);

export default User;
