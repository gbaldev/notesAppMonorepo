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
  BadRequestException,
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
  async create(
    @Request() req: any,
    @Body() payload: CreateNoteDto | CreateNoteDto[],
  ) {
    const userId = req.user.sub;

    if (Array.isArray(payload)) {
      return this.notesService.createBatch(
        payload.map((noteDto) => ({
          ...noteDto,
          userId,
        })),
      );
    } else {
      return this.notesService.create({
        ...payload,
        userId,
      });
    }
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

  @Put(':id?')
  async update(
    @Param('id') id: string,
    @Body() payload: UpdateNoteDto | { id: string; note: UpdateNoteDto }[],
  ) {
    if (Array.isArray(payload)) {
      return this.notesService.updateBatch(payload);
    } else {
      if (!id) {
        throw new BadRequestException('ID is required for single note update');
      }
      return this.notesService.update(id, payload);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notesService.remove(id);
  }
}
