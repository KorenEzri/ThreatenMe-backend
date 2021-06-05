import mongoose, { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import { OnionDoc } from '../../../types';

const onionDbSchema: Schema = new mongoose.Schema({
  keyword: String,
  source: String,
  urls: Array,
  active: Boolean,
  createdAt: Date || String,
  updatedAt: Date || String,
});

onionDbSchema.plugin(uniqueValidator);
onionDbSchema.set('toJSON', {
  transform: (_: any, returnedObject: any) => {
    delete returnedObject.__v;
  },
});

export const Onion = mongoose.model<OnionDoc>('Onion', onionDbSchema);
