import mongoose from 'mongoose';

import User from '../modules/user/UserModel';
import Task from '../modules/tasks/TaskModel';

mongoose.Promise = global.Promise;

export { User, Task };
