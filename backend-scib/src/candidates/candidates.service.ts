import { Injectable } from '@nestjs/common';
import * as XLSX from 'xlsx';

@Injectable()
export class CandidatesService {
    
  parseExcel(file: Express.Multer.File) {
    const workbook = XLSX.read(file.buffer, { type: 'buffer' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const [parsed] = XLSX.utils.sheet_to_json(sheet, { raw: true }) as any[];
    return parsed;
  }

  combineData(name: string, surname: string, excelData: any) {
    return {
      name,
      surname,
      seniority: excelData.seniority,
      yearsOfExperience: excelData.yearsOfExperience,
      availability: excelData.availability,
    };
  }
}
