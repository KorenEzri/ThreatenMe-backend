import { Document } from 'mongoose';

export interface IOnion {
  __id: string;
  keyword: string;
  source: string;
  urls: string[];
  active?: boolean;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface OnionDoc extends Document, IOnion {}
