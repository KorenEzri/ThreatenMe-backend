import { Document } from 'mongoose';

export interface IPaste {
  __id: string;
  source: string;
  title: string;
  language: string;
  posted_by: string;
  body: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}
export interface IPastes {
  source: string;
  pastes: IPaste[];
}

export interface PastesDoc extends Document, IPastes {}
