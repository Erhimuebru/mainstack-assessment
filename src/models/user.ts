import { Schema, model, Document } from 'mongoose';

interface IUser extends Document {
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date

}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default model<IUser>('User', userSchema);
