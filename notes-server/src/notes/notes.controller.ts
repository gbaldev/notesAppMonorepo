import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Request,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('notes')
@UseGuards(JwtAuthGuard)
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  create(@Request() req: any, @Body() createNoteDto: CreateNoteDto) {
    const userId = req.user.sub;
    return this.notesService.create({
      ...createNoteDto,
      userId,
    });
  }

  @Get()
  findAll(@Request() req: any) {
    const userId = req.user.sub;
    return this.notesService
      .findByUserId(userId)
      .then((result) => result.reverse());
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notesService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
    return this.notesService.update(id, updateNoteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notesService.remove(id);
  }
}
