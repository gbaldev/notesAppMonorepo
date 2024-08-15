import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note, NoteDocument } from './entities/note.entity';

@Injectable()
export class NotesService {
  constructor(@InjectModel(Note.name) private noteModel: Model<NoteDocument>) {}

  create(createNoteDto: CreateNoteDto): Promise<Note> {
    const createdNote = new this.noteModel(createNoteDto);
    return createdNote.save();
  }

  findAll(): Promise<Note[]> {
    return this.noteModel.find().exec();
  }

  findByUserId(userId: string): Promise<Note[]> {
    return this.noteModel.find({ userId }).exec();
  }

  findOne(id: string): Promise<Note> {
    return this.noteModel.findById(id).exec();
  }

  update(id: string, updateNoteDto: UpdateNoteDto): Promise<Note> {
    return this.noteModel
      .findByIdAndUpdate(
        id,
        { ...updateNoteDto, editedAt: new Date() },
        { new: true },
      )
      .exec();
  }

  remove(id: string): Promise<Note> {
    return this.noteModel
      .findByIdAndUpdate(
        id,
        {
          status: 'DELETED',
          editedAt: new Date(),
        },
        { new: true },
      )
      .exec();
  }
}
