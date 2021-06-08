import mongoose, { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import { PastesDoc } from '../../../types';

const pastesDbSchema: Schema = new mongoose.Schema({
  source: { type: String, unique: true },
  pastes: Array,
});

pastesDbSchema.plugin(uniqueValidator);
pastesDbSchema.set('toJSON', {
  transform: (_: any, returnedObject: any) => {
    delete returnedObject.__v;
  },
});

export const Pastes = mongoose.model<PastesDoc>('Pastes', pastesDbSchema);
