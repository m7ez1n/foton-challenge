import mongoose, { Document, Model } from 'mongoose';

const Schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
    collection: 'Task',
  },
);

Schema.index({ title: 'text', description: 'text' });

export interface ITask extends Document {
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const TaskModel: Model<ITask> = mongoose.model('Task', Schema);

export default TaskModel;
