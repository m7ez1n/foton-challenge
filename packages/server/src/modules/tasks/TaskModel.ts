import mongoose, { Document, Model } from 'mongoose';

const Schema = new mongoose.Schema(
  {
    title: {
      type: String,
      description: 'Task title',
      index: true,
      required: true,
    },
    description: {
      type: String,
      description: 'Task description',
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
    collection: 'Event',
  },
);

Schema.index({ title: 'text', description: 'text' });

export interface ITask extends Document {
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const TaskModel: Model<ITask> = mongoose.model<ITask, Model<ITask>>('Task', Schema);

export default TaskModel;
