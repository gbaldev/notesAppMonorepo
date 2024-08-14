import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NoteDocument = Note & Document;

@Schema()
export class Note {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  priority: 'high' | 'medium' | 'low';

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  editedAt: Date;

  @Prop({ default: 'ACTIVE' })
  status: 'ACTIVE' | 'DELETED';

  @Prop({ required: true })
  userId: string;
}

export const NoteSchema = SchemaFactory.createForClass(Note);
