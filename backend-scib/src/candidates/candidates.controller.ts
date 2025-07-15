import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Body,
  Get,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CandidatesService } from './candidates.service';

@Controller('candidates')
export class CandidatesController {
  constructor(private readonly candidatesService: CandidatesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('excel'))
  uploadCandidate(
    @UploadedFile() file: Express.Multer.File,
    @Body('name') name: string,
    @Body('surname') surname: string,
  ) {
    const excelData = this.candidatesService.parseExcel(file);
    return this.candidatesService.combineData(name, surname, excelData);
  }

  @Get('ping')
  ping() {
    return { message: 'Backend is up!' };
  }
}
