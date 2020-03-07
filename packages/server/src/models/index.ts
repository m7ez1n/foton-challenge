import mongoose from 'mongoose';

import User from '../modules/user/UserModel';

mongoose.Promise = global.Promise;

export { User };
