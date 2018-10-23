import mongoose from 'mongoose';
import moment from 'moment';

const UserSchema = new mongoose.Schema({
	name: String,
  surname: String,
  password: String,
  createdAt: { type: Date, default: moment().toDate() },
});

const User = mongoose.model("users", UserSchema);
export { User };